import { $api, instance } from "@/api/axios"
import { CreateReviewDto, IReview, IReviewWithUser } from "./reviews.interface"

class ReviewsService {
  async getByProductId(productId: number) {
    const { data } = await $api.get<IReviewWithUser[]>(`/review/product/${productId}`)

    return data
  }

  async create(dto: CreateReviewDto) {
    const { data } = await instance.post<IReview>('/review', dto)

    return data
  }
}

export default new ReviewsService()