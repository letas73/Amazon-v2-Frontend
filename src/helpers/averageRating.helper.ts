import { IReview } from "@/services/reviews/reviews.interface";

export const averageRating = (reviews: IReview[]): number => {
  
  if (!reviews.length) {
    return 0
  }

  const totalRating = reviews.reduce((acc, obj) => obj.rating + acc, 0)

  const averageRating = Math.round(totalRating / reviews.length)

  return averageRating
}