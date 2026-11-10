
import type { SavedItem } from "./types";

const STORAGE_KEY = "afaq_saved_items";
export const SAVED_ITEMS_EVENT = "afaq:saved-items-changed";

// Get all saved items
export const getSavedItems = (): SavedItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    const parsed: unknown = JSON.parse(data);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is SavedItem =>
        item !== null &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.type === "string" &&
        typeof item.title === "string" &&
        typeof item.route === "string"
    );
  } catch {
    return [];
  }
};

// Save items and notify components
const updateSavedItems = (items: SavedItem[]) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

    window.dispatchEvent(new Event(SAVED_ITEMS_EVENT));
  } catch (error) {
    console.error("Failed to update saved items:", error);
  }
};

// Check if an item is saved
export const isSaved = (
  id: string,
  type: SavedItem["type"]
): boolean => {
  return getSavedItems().some(
    (item) => item.id === id && item.type === type
  );
};

// Add item to favorites
export const addToSaved = (item: SavedItem) => {
  const items = getSavedItems();

  const alreadySaved = items.some(
    (saved) =>
      saved.id === item.id && saved.type === item.type
  );

  if (alreadySaved) return;

  updateSavedItems([
    {
      ...item,
      savedAt: new Date().toISOString(),
    },
    ...items,
  ]);
};

// Remove item from favorites
export const removeFromSaved = (
  id: string,
  type: SavedItem["type"]
): void => {
  const items = getSavedItems();

  const updatedItems = items.filter(
    (item) => !(item.id === id && item.type === type)
  );

  if (updatedItems.length === items.length) return;

  updateSavedItems(updatedItems);
};

// Toggle saved status
export const toggleSaved = (item: SavedItem): boolean => {
  if (isSaved(item.id, item.type)) {
    removeFromSaved(item.id, item.type);
    return false;
  }

  addToSaved(item);
  return isSaved(item.id, item.type);
};

// Remove all saved items
export const clearSavedItems = (): void => {
  updateSavedItems([]);
};

// Subscribe to changes (same tab + other tabs)
export const subscribeToSavedItems = (
  callback: () => void
): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener(SAVED_ITEMS_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(SAVED_ITEMS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};
