import { api } from "@/lib/fetch-util";
import { useAuth } from "@/provider/auth-context";
import type { User, Workspace } from "@/types";
import { Bell, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { WorkspaceAvatar } from "../workspace/workspace-avatar";
import { useUserProfileQuery } from "@/hooks/use-user";
import { toast } from "sonner";

interface HeaderProps {
  onWorkspaceSelected: (workspace: Workspace) => void;
  selectedWorkspace: Workspace | null;
  onCreateWorkspace: () => void;
}

export const Header = ({
  onWorkspaceSelected,
  selectedWorkspace,
  onCreateWorkspace,
}: HeaderProps) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { workspaces } = useLoaderData() as { workspaces: Workspace[] };
  const isOnWorkspacePage = useLocation().pathname.includes("/workspace");
  const [defautWorkspace, setDefautWorkspace] = useState<Workspace | null>(
    null
  );

  const { data: userData, isLoading, error } = useUserProfileQuery() as {data: User, isLoading: boolean, error: any};

if (isLoading) console.log("Loading user data...");
if (error) toast.error("Failed to load user data");

console.log("User profile:", userData);

  // const fetchUserProfile = async () => {
  //   try {
  //     const response = await api.get("/users/profile");
  //     console.log("userProfileData", response);

  //     const userData: User = response.data; // or just response if API returns directly
  //     console.log("userData", userData);
  //   } catch (error) {
  //     console.error("Failed to fetch user profile:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserProfile();
  // }, []);

  useEffect(() => {
    if (!selectedWorkspace) {
      const stored = localStorage.getItem("workspace");
      if (stored) {
        const workspace: Workspace = JSON.parse(stored);
        onWorkspaceSelected(workspace);
        setDefautWorkspace(workspace);

        if (isOnWorkspacePage) {
          navigate(`/workspaces/${workspace._id}`);
        } else {
          navigate(`${window.location.pathname}?workspaceId=${workspace._id}`);
        }
      }
    }
  }, [selectedWorkspace, onWorkspaceSelected, isOnWorkspacePage, navigate]);

  const handleOnClick = (workspace: Workspace) => {
    onWorkspaceSelected(workspace);
    const location = window.location;

    if (isOnWorkspacePage) {
      navigate(`/workspaces/${workspace._id}`);
    } else {
      const basePath = location.pathname;

      navigate(`${basePath}?workspaceId=${workspace._id}`);
    }
  };

  return (
    <div className="bg-background sticky top-0 z-40 border-b">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              {selectedWorkspace ? (
                <>
                  {selectedWorkspace.color && (
                    <WorkspaceAvatar
                      color={selectedWorkspace.color}
                      name={selectedWorkspace.name}
                    />
                  )}
                  <span className="font-medium">{selectedWorkspace?.name}</span>
                </>
              ) : !defautWorkspace ? (
                <span className="font-medium">Select Workspace</span>
              ) : (
                <>
                  {defautWorkspace?.color && (
                    <WorkspaceAvatar
                      color={defautWorkspace?.color}
                      name={defautWorkspace.name}
                    />
                  )}
                  <span className="font-medium">{defautWorkspace?.name}</span>
                </>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Workspace</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {workspaces.map((ws) => (
                <DropdownMenuItem
                  key={ws._id}
                  onClick={() => handleOnClick(ws)}
                >
                  {ws.color && (
                    <WorkspaceAvatar color={ws.color} name={ws.name} />
                  )}
                  <span className="ml-2">{ws.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onCreateWorkspace}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Workspace
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full border p-1 w-8 h-8 cursor-pointer">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={userData?.profilePicture} alt={user?.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-point">
                <Link to="/user/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
