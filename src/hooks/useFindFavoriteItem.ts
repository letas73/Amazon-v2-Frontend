import { IFavoriteItem } from "@/types/favorite-item.types";

export const useFindFavoriteItem = (favoriteItems: IFavoriteItem[], favoriteItemId: number): boolean => {
  const findItem = favoriteItems.find((obj) => obj.id === favoriteItemId)

  if (findItem) return true
  
  return false
}