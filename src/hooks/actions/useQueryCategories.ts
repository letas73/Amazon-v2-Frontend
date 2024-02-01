'use client'
import categoriesService from "@/services/categories/categories.service"
import { ICategory } from "@/types/category.types"
import { useQuery } from "@tanstack/react-query"

export const useQueryCategories = () => {
  const { data, refetch } = useQuery({
    queryKey: ['get-categories'],
    queryFn: () => categoriesService.getAll()
  })

  return {
    data: data ? data : <ICategory[]>[],
    refetch
  }
}