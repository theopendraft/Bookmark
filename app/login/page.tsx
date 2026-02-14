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
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-6 text-2xl font-bold">Smart Bookmarks</h1>
        <button
          onClick={handleLogin}
          className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
