import React, { useCallback, useState, type JSX } from "react";

export default function Error404(): JSX.Element {
  const [query, setQuery] = useState("");
  const [quote] = useState(() => {
    const quotes = [
      "Small steps count — try again!",
      "Every detour leads somewhere useful.",
      "Not all those who wander are lost.",
      "You’re not lost — you’re exploring!",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  });

  const onSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    },
    [query]
  );

  const goBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  }, []);

  const goHome = useCallback(() => {
    window.location.href = "/";
  }, []);

  const reload = useCallback(() => {
    window.location.reload();
  }, []);

  const suggested = [
    { label: "Home", href: "/" },
    { label: "Latest Articles", href: "/blog" },
    { label: "Contact Support", href: "/contact" },
    { label: "Help Center", href: "/help" },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 p-6 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl w-full bg-white/90 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <svg
              viewBox="0 0 260 260"
              xmlns="http://www.w3.org/2000/svg"
              className="w-56 h-56 sm:w-72 sm:h-72"
              aria-hidden
            >
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>

              <rect
                x="10"
                y="10"
                width="240"
                height="240"
                rx="28"
                fill="url(#g)"
                opacity="0.12"
              />

              <g transform="translate(40,40)">
                <path
                  d="M0 80 Q40 0 80 40 T160 40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="animate-dash"
                />

                <circle cx="24" cy="80" r="8" fill="#60a5fa" className="animate-bounce-slow" />
                <circle cx="120" cy="24" r="10" fill="#3b82f6" className="animate-bounce-slow delay-200" />
              </g>

              <style>{`
                .animate-dash { stroke-dasharray: 180; stroke-dashoffset: 180; animation: dash 2.2s ease forwards; }
                @keyframes dash { to { stroke-dashoffset: 0; } }

                .animate-bounce-slow { animation: bounceY 2.2s infinite; transform-origin: center; }
                .delay-200 { animation-delay: 0.2s; }
                @keyframes bounceY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
              `}</style>
            </svg>
          </div>

          {/* Right: Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-blue-600">404</h1>
            <p className="mt-2 text-lg font-semibold text-slate-700 dark:text-slate-200">Oops — we can’t find that page.</p>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-prose">
              The page may have moved, been renamed, or is temporarily unavailable. Try one of the options below or use the search to find what you're looking for.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-3 justify-center md:justify-start">
              <button
                onClick={goBack}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 bg-white text-blue-600 hover:bg-blue-50 shadow-sm focus:ring-2 focus:ring-blue-300"
              >
                ← Go back
              </button>

              <button
                onClick={goHome}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm focus:ring-2 focus:ring-blue-300"
              >
                Home
              </button>

              <button
                onClick={reload}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm focus:ring-2 focus:ring-blue-300"
              >
                Try again
              </button>
            </div>

            <form onSubmit={onSearch} className="mt-6 flex items-center max-w-md mx-auto md:mx-0">
              <label htmlFor="search" className="sr-only">Search site</label>
              <input
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the site..."
                className="flex-1 rounded-l-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-label="Search the site"
              />
              <button
                type="submit"
                className="rounded-r-lg px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
              >
                Search
              </button>
            </form>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start md:items-center">
              <ul className="flex-1 grid grid-cols-2 gap-2 text-sm">
                {suggested.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      className="inline-block px-3 py-2 rounded-md text-blue-600 hover:bg-blue-50"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex-1 text-sm">
                <p className="text-slate-600 dark:text-slate-300">Need help? <a href="mailto:support@example.com" className="text-blue-600 underline">Contact support</a> or visit our <a href="/help" className="text-blue-600 underline">help center</a>.</p>
              </div>
            </div>

            <blockquote className="mt-6 p-4 rounded-lg bg-blue-50 border-l-4 border-blue-200 text-sm text-blue-800 max-w-prose">
              <span className="italic">“{quote}”</span>
            </blockquote>

            <p className="mt-4 text-xs text-slate-400">If you reached this page from a bookmarked URL, try removing parameters or visit the <a href="/" className="underline text-blue-600">homepage</a>.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
