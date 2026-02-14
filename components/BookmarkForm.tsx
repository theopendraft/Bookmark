"use client";

import { addBookmark } from "@/app/dashboard/actions";

export function BookmarkForm() {
  return (
    <div className="mb-8 rounded border p-4">
      <h2 className="mb-4 text-xl font-bold">Add New Bookmark</h2>
      <form action={addBookmark} className="flex gap-4">
        <input
          name="title"
          type="text"
          placeholder="Title"
          required
          className="rounded border px-4 py-2 flex-1"
        />
        <input
          name="url"
          type="url"
          placeholder="https://example.com"
          required
          className="rounded border px-4 py-2 flex-1"
        />
        <button
          type="submit"
          className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700"
        >
          Add
        </button>
      </form>
    </div>
  );
}
