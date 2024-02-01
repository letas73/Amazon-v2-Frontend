import { IUser } from "@/types/user.types"

export interface IReview {
  id: number
  rating: number
  text: string
  userId: number
  productId: number
}

export interface IReviewWithUser extends IReview {
  user: IUser
}

export interface CreateReviewDto {
  rating: number
  text: string
  userId: number
  productId: number
}