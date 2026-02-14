"use client";

import { createClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const handleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#222a33] bg-[#11161c] p-8 shadow-lg">

        <div className="">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xl font-semibold text-[#7c9aff] transition hover:text-[#6b89ed] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#7c9aff] border border-[#222a33] rounded-lg px-3 py-1"
          >
            <span aria-hidden="true">←</span>
            
          </a>
        </div>
        
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8b949e]">
            Welcome back
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[#e6edf3]">
            Smart Bookmarks
          </h1>
          {/* <p className="mt-2 text-sm text-[#8b949e]">Sign in to continue with Google</p> */}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLogin}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#7c9aff] px-4 py-3 text-sm font-semibold text-[#0b0f14] transition hover:bg-[#6b89ed] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#7c9aff]"
          >
            Continue with Google
          </button>

          <button
            onClick={handleLogin}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#222a33] px-4 py-3 text-sm font-semibold text-[#e6edf3] transition hover:border-[#2f3844] hover:bg-[#151b22] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#7c9aff]"
          >
            Create account with Google
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-[#8b949e]">
          By continuing, you agree to our terms and privacy policy.
        </p>
      </div>
    </div>
  );
}
