import React, { useState, useEffect } from "react";
import type { Route } from "../../+types/root";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHub" },
    {
      name: "description",
      content: "The modern task management platform for teams.",
    },
  ];
}

const Homepage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Sticky Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/50 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-24 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 rounded-md p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-5 w-5 text-primary-foreground"
              >
                <path d="m3 17 2 2 4-4" />
                <path d="m3 7 2 2 4-4" />
                <path d="M13 6h8" />
                <path d="M13 12h8" />
                <path d="M13 18h8" />
              </svg>
            </div>
              <span className="font-bold text-xl hidden sm:inline-block">
                Taskhub
              </span>
          </a>

          {/* Nav Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/sign-in"
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              Log in
            </Link>
            <Link to="/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 md:px-24 pt-24 md:pt-32 pb-20 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Get more done with <span className="text-blue-600">TaskHub</span>
          </h1>
          <p className="text-muted-foreground max-w-lg">
            The modern task management platform that helps teams organize,
            track, and complete work efficiently.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/sign-up">
              <Button>Try for Free</Button>
            </Link>
            <Button variant="outline">See Features</Button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mt-6">
            <span>• No credit card required</span>
            <span>• Free plan available</span>
            <span>• Cancel anytime</span>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="w-full max-w-lg">
            <Card className="overflow-hidden rounded-xl shadow-lg !py-0 ring-8 ring-gray-200">
              <div className="rounded-lg text-white">
                <img
                  src="/thumbnail.png"
                  alt="thumbnail"
                  className="rounded-md"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-12">
          <Badge className="text-sm text-muted-foreground bg-accent">
            Our Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Everything you need to manage tasks effectively
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Our powerful features help teams stay organized and deliver projects
            on time
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🏷️",
              title: "Team Collaboration",
              description:
                "Work together seamlessly with your team in shared workspaces with real-time updates.",
            },
            {
              icon: "📋",
              title: "Task Management",
              description:
                "Organize tasks with priorities, due dates, comments, and track progress visually.",
            },
            {
              icon: "📈",
              title: "Progress Tracking",
              description:
                "Visualize project progress with beautiful charts and get insights into team productivity.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-center mb-4 w-12 h-12 rounded-full bg-blue-50 text-blue-600 text-xl">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-6 md:px-12 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <Badge className="text-sm text-muted-foreground bg-accent">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Simple process, powerful results
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Get started in minutes and see improved team productivity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🔐",
              title: "Create an account",
              description:
                "Sign up for free and set up your first workspace in seconds.",
            },
            {
              icon: "👥",
              title: "Invite your team",
              description:
                "Add your team members and start collaborating right away.",
            },
            {
              icon: "🚀",
              title: "Get things done",
              description:
                "Create projects, assign tasks, and track progress in real-time.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow hover:shadow-md transition"
            >
              <div className="flex items-center justify-center mb-4 w-10 h-10 rounded-full bg-gray-100 text-xl">
                {step.icon}
              </div>
              <h4 className="font-semibold text-lg">{step.title}</h4>
              <p className="text-sm text-muted-foreground mt-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold">
            Ready to boost your team's productivity?
          </h3>
          <p className="text-sm md:text-base mt-3 text-blue-100 max-w-2xl mx-auto">
            Join thousands of teams that use TaskHub to get more done, together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/sign-up">
              <Button className="bg-background text-gray-800 hover:bg-accent">
                Get Started Free
              </Button>
            </Link>
            <Link to="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 md:px-12 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <div className="font-semibold">TaskHub</div>
            <div className="text-xs mt-2">
              Simplify task management and team collaboration.
            </div>
            <div className="mt-4 text-xs">
              © 2025 TaskHub. All rights reserved.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <div className="font-semibold">Product</div>
              <ul className="mt-2 space-y-1">
                <li>Features</li>
                <li>Pricing</li>
                <li>Use Cases</li>
                <li>Roadmap</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold">Company</div>
              <ul className="mt-2 space-y-1">
                <li>About</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold">Legal</div>
              <ul className="mt-2 space-y-1">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
