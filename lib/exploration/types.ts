
export type ExplorationType =
  | "solar_system_category"
  | "planet"
  | "mission"
  | "discovery"
  | "article"
  | "research"
  | "quran"
  
export interface SavedItem {
  id: string;
  type: ExplorationType;
  title: string;
  image?: string;
  route: string;
  savedAt?: string;
}

export interface SavedItemsState {
  items: SavedItem[];
}
