import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import { BookmarkForm } from "@/components/BookmarkForm";
import { BookmarkList } from "@/components/BookmarkList";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl p-8 bg-[#0b0f14]">
      <div className="flex items-center justify-between pb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600">{user.email}</p>
          <form
            action={async () => {
              "use server";
              const supabase = await createClient();
              await supabase.auth.signOut();
              redirect("/login");
            }}
          >
            <button className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600">
              Sign Out
            </button>
          </form>
        </div>
      </div>

      <BookmarkForm />
      <BookmarkList bookmarks={bookmarks || []} userId={user.id} />
    </div>
  );
}
