'use client'
import productsService from "@/services/products/products.service"
import { IProduct } from "@/types/product.types"
import { EnumProductSort } from "@/types/sort.types"
import { useQuery } from "@tanstack/react-query"

export const useQueryProducts = (sort: EnumProductSort = EnumProductSort.NEWEST) => {
  const { data, refetch } = useQuery({
    queryKey: ['get-products'],
    queryFn: () => productsService.getAll({sort})
  })

  return {
    data: data ? data : <IProduct[]>[],
    refetch
  }
}