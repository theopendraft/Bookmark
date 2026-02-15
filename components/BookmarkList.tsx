"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { deleteBookmark } from "@/app/dashboard/actions";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  created_at: string;
  user_id: string;
}

export function BookmarkList({
  bookmarks,
  userId,
}: {
  bookmarks: Bookmark[];
  userId: string;
}) {
  const [items, setItems] = useState(bookmarks);
  const [loading, setLoading] = useState(true);
  const [supabase] = useState(() => createClient());

  // Sync state with server props when they change (e.g., after revalidatePath)
  useEffect(() => {
    setItems(bookmarks);
    setLoading(false);
  }, [bookmarks]);

  useEffect(() => {
    // Unique channel name per user to prevent conflicts
    const channelName = `realtime:bookmarks:${userId}`;

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          // Removing the filter from the subscription config to ensure we receive the event
          // We filter in the callback below instead
        },
        (payload) => {
          console.log("Realtime event received:", payload);
          
          // Manual filtering to ensure security/relevance on client side
          if (payload.new && 'user_id' in payload.new && payload.new.user_id !== userId) {
             return;
          }

          if (payload.eventType === "INSERT") {
            setItems((prev) => {
              if (prev.some((item) => item.id === payload.new.id)) return prev;
              const newBookmark = payload.new as Bookmark;
              // Ensure we don't add bookmarks for other users (double check)
              if (newBookmark.user_id && newBookmark.user_id !== userId) return prev;
              
              return [newBookmark, ...prev];
            });
          } else if (payload.eventType === "DELETE") {
            setItems((prev) =>
              prev.filter((item) => item.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe((status) => {
        console.log(`Realtime status for ${channelName}:`, status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  if (loading) {
    return (
      <ul className="space-y-3">
        {[1, 2, 3].map((key) => (
          <li
            key={key}
            className="rounded-xl border border-gray-600/50 p-4 shadow-sm animate-pulse"
          >
            <div className="h-4 w-3/4 rounded-md bg-gray-600" />
            <div className="mt-2 h-3 w-1/2 rounded-md bg-gray-600" />
          </li>
        ))}
      </ul>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded  bg-transparent p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-200">No bookmarks yet</h3>
        <p className="mt-2 text-sm text-gray-500">Add your first link to get started.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3 py-2 rounded-xl border bg-[#11161c44] border-[#222a33] bg-blue-1200  shadow-sm transition duration-150 hover:border-blue-200/50">
      {items.map((bookmark) => (
        <li
          key={bookmark.id}
          className="flex items-center justify-between px-4 py-2"
        >
          <div className="flex-1 pr-4">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-blue-300 hover:text-blue-600 hover:underline"
            >
              {bookmark.title}
            </a>
            <p className="text-xs text-gray-500">
              {new Date(bookmark.created_at).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-400">{bookmark.url}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(bookmark.url)}
              className="rounded px-3 py-1 text-sm text-blue-300 transition hover:border-blue-200 hover:text-[#6b89ed] focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Copy URL
            </button>
            <button
              onClick={() => deleteBookmark(bookmark.id)}
              className="rounded border border-red-600 bg-red-400 px-3 py-1 text-sm hover:text-white text-gray-200 transition hover:bg-red-600 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-red-400"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
