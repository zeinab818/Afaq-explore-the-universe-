
"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

import type { SavedItem } from "@/lib/exploration/types";

import {
  isSaved,
  toggleSaved,
  subscribeToSavedItems,
} from "@/lib/exploration/storage";

interface SaveButtonProps {
  item: SavedItem;
  className?: string;
}

export default function SaveButton({
  item,
  className = "",
}: SaveButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const syncSavedState = () => {
      setSaved(isSaved(item.id, item.type));
    };

    syncSavedState();

    return subscribeToSavedItems(syncSavedState);
  }, [item.id, item.type]);

  const handleToggle = () => {
    const newSavedState = toggleSaved(item);
    setSaved(newSavedState);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={saved ? "Remove from favorites" : "Save to favorites"}
      aria-pressed={saved}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl border px-4 py-2.5
        transition-all duration-300
        ${
          saved
            ? "border-purple-500 bg-purple-500/15 text-purple-300"
            : "border-white/15 bg-white/5 text-white hover:border-purple-400 hover:text-purple-300"
        }
        ${className}
      `}
    >
      {saved ? (
        <BookmarkCheck size={18} />
      ) : (
        <Bookmark size={18} />
      )}

      <span>{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
