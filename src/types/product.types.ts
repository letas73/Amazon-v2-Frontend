import { IReview } from "@/services/reviews/reviews.interface"
import { ICategory } from "./category.types"

export interface IProduct {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  price: number
  images: string[]
  description: string
  rating: number
  categoryId: number
  category: ICategory
  reviews: IReview[]
}