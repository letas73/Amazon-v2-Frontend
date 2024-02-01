'use client'
import { useQuery } from "@tanstack/react-query"
import { useProfile } from "@/hooks/useProfile"
import cartService from "@/services/cart/cart.service"
import { IBasketItem } from "@/types/basket-item.types"

export const useQueryBasketItem = () => {
  const user = useProfile()

  const { data, refetch } = useQuery({
    queryKey: ['get-basket-item'],
    queryFn: () => cartService.getAll(user?.basket.id),
    enabled: !!user?.basket.id
  })

  return {
    data: data ? data : <IBasketItem[]>[],
    refetch,
    length: data ? data.length : 0
  }
}