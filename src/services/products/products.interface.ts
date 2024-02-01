import { EnumProductSort } from "@/types/sort.types"

export interface GetAllQueryParams {
  categoryId?: number
  minPrice?: number
  maxPrice?: number
  searchTerm?: string
  rating?: number
  sort: EnumProductSort
}

export interface ProductCreateDto {
  title: string
  price: number
  description: string
  images: string[]
  categoryId: number
}

export interface ProductUpdateBody {
  title?: string
  price?: number
  description?: string
  images?: string[]
  categoryId?: number
}

export interface ProductUpdateDto {
  id: number
  body: ProductUpdateBody
}