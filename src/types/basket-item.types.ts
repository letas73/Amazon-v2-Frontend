import { IProduct } from "./product.types"

export interface IBasketItem {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  price: number
  image: string
  basketId: number
  productId: number
  product: IProduct
}