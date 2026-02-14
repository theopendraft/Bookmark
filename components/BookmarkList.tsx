"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { deleteBookmark } from "@/app/dashboard/actions";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

export function BookmarkList({
  bookmarks,
  userId,
}: {
  bookmarks: Bookmark[];
  userId: string;
}) {
  const [items, setItems] = useState(bookmarks);
  const [supabase] = useState(() => createClient());

  // Sync state with server props when they change (e.g., after revalidatePath)
  useEffect(() => {
    setItems(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    const channel = supabase
      .channel("public:bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setItems((prev) => {
              // Prevent duplicates if server action re-render happens first
              if (prev.some((item) => item.id === payload.new.id)) return prev;
              return [payload.new as Bookmark, ...prev];
            });
          } else if (payload.eventType === "DELETE") {
            setItems((prev) =>
              prev.filter((item) => item.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("Realtime connected!");
        }
        if (status === "CHANNEL_ERROR") {
          console.error("Realtime connection error");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  if (items.length === 0) {
    return <p className="text-gray-500">No bookmarks yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {items.map((bookmark) => (
        <li
          key={bookmark.id}
          className="flex items-center justify-between rounded border p-4"
        >
          <div>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-blue-600 hover:underline"
            >
              {bookmark.title}
            </a>
            <p className="text-xs text-gray-400">
              {new Date(bookmark.created_at).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="rounded bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
