import { IProduct } from "./product.types"

export interface IFavoriteItem {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  price: number
  image: string
  favoriteId: number
  productId: number
  product: IProduct
}