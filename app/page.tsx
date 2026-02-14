const sections = {
  stack: [
    {
      title: "Next.js App Router",
      desc: "Server components, server actions, and edge-ready routing.",
    },
    {
      title: "Supabase",
      desc: "Auth, Postgres, RLS, and Realtime for live bookmark updates.",
    },
    {
      title: "Tailwind CSS",
      desc: "Utility-first styling with a lean, product-first design system.",
    },
  ],
  features: [
    {
      title: "Private by default",
      desc: "Bookmarks scoped to your account via Supabase RLS.",
    },
    {
      title: "Google Sign-in",
      desc: "One-click auth handled through Supabase OAuth.",
    },
    {
      title: "Realtime sync",
      desc: "Live updates across tabs/devices without page reloads.",
    },
    {
      title: "Fast add & delete",
      desc: "Server actions keep mutations simple and robust.",
    },
  ],
  workflow: [
    "Sign in with Google.",
    "Add bookmarks with title + URL.",
    "View, filter, and delete your links.",
    "Stay in sync with realtime updates.",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#e6edf3] max-w-7xl mx-auto px-4 py-16 ">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 lg:py-24">
        {/* Hero */}
        <header className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8b949e]">
              Smart Bookmark App
            </p>
            <h1 className="text-3xl font-semibold leading-tight lg:text-5xl">
              Organize, sync, and secure your bookmarks.
            </h1>
            <p className="max-w-2xl text-sm text-[#8b949e]">
              A focused, production-ready bookmarking experience built with
              Next.js, Supabase, and Tailwind. Private by default, realtime by
              design.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/login"
                className="rounded-lg bg-[#7c9aff] px-4 py-2 text-sm font-semibold text-[#0b0f14] transition hover:bg-[#6b89ed] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#7c9aff]"
              >
                Go to Login
              </a>
              <a
                href="/dashboard"
                className="rounded-lg border border-[#222a33] px-4 py-2 text-sm font-semibold text-[#e6edf3] transition hover:border-[#2f3844] hover:bg-[#11161c] focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-[#7c9aff]"
              >
                View Dashboard
              </a>
            </div>
          </div>
          <div className="w-full max-w-md rounded-2xl border border-[#222a33] bg-[#11161c] p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Quick Facts</h2>
            <div className="mt-4 space-y-3 text-sm text-[#c6d0da]">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[#8b949e]">Auth</span>
                <span className="font-medium text-[#e6edf3]">
                  Supabase Google OAuth
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[#8b949e]">Database</span>
                <span className="font-medium text-[#e6edf3]">
                  Postgres + RLS policies
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[#8b949e]">Realtime</span>
                <span className="font-medium text-[#e6edf3]">
                  Supabase Realtime channels
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[#8b949e]">UI</span>
                <span className="font-medium text-[#e6edf3]">
                  Next.js App Router + Tailwind
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Tech Stack */}
        <section className="grid gap-4 lg:grid-cols-3">
          {sections.stack.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[#222a33] bg-[#11161c] p-5 transition hover:border-[#2d3640]"
            >
              <h3 className="text-base font-semibold text-[#e6edf3]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[#8b949e]">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Features */}
        <section className="space-y-4">
          <div className="flex items-center justify-center mt-14 p-2 gap-3">
            <h2 className="text-5xl font-semibold">What you get</h2>
           </div>
            <span className="text-xs text-[#8b949e] uppercase tracking-[0.2em] flex items-center justify-center ">
              Built for a clean, focused workflow
            </span>
         
          <div className="grid gap-4 md:grid-cols-2 mt-14">
            {sections.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-[#222a33] bg-[#11161c] p-5 transition hover:border-[#2d3640]"
              >
                <h3 className="text-base font-semibold text-[#e6edf3]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-[#8b949e]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="rounded-2xl border border-[#222a33] bg-[#11161c] p-6">
          <h2 className="text-lg font-semibold">How it works</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[#c6d0da]">
            {sections.workflow.map((step, idx) => (
              <li key={idx} className="leading-relaxed text-[#8b949e]">
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#222a33] bg-[#11161c] p-6">
          <div className="flex-1 space-y-1">
            <h3 className="text-base font-semibold text-[#e6edf3]">
              Ready to jump in?
            </h3>
            <p className="text-sm text-[#8b949e]">
              Sign in with Google to start adding and syncing your bookmarks.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/login"
              className="rounded-lg bg-[#7c9aff] px-4 py-2 text-sm font-semibold text-[#0b0f14] transition hover:bg-[#6b89ed] focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-[#7c9aff]"
            >
              Sign in
            </a>
            <a
              href="/dashboard"
              className="rounded-lg border border-[#222a33] px-4 py-2 text-sm font-semibold text-[#e6edf3] transition hover:border-[#2f3844] hover:bg-[#151b22] focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-[#7c9aff]"
            >
              Dashboard
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
