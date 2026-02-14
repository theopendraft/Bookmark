"use client";

import { addBookmark } from "@/app/dashboard/actions";

export function BookmarkForm() {
  return (
    <div className="mb-8 rounded-xl border p-4 bg-[#11161c] border-[#222a33] ">
      <h2 className="mb-4 text-xl font-bold">Add New Bookmark</h2>
      <form action={addBookmark} className="flex gap-4">
        <input
          name="title"
          type="text"
          placeholder="Title"
          required
          className="rounded-md border border-[#222a33] px-4 py-2 flex-1"
        />
        <input
          name="url"
          type="url"
          placeholder="https://example.com"
          required
          className="rounded-md border border-[#222a33] px-4 py-2 flex-1"
        />
        <button
          type="submit"
          className="rounded-md border-0 bg-[#7c9aff] px-6 py-2 text-[#0b0f14] hover:bg-[#6b89ed]"
        >
          Add
        </button>
      </form>
    </div>
  );
}
