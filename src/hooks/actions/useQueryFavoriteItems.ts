'use client'
import { useProfile } from "@/hooks/useProfile"
import favoritesService from "@/services/favorites/favorites.service"
import { IFavoriteItem } from "@/types/favorite-item.types"
import { useQuery } from "@tanstack/react-query"

export const useQueryFavoriteItems = () => {
  const user = useProfile()

  const { data, refetch } = useQuery({
    queryKey: ['get_favorite-items'],
    queryFn: () => favoritesService.getAll(user?.favorite.id),
    enabled: !!user?.favorite.id
  })

  return {
    data: data ? data : <IFavoriteItem[]>[],
    refetch,
    length: data ? data.length : 0
  }
}