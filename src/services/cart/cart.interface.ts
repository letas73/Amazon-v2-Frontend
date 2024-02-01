import { IBasketItem } from "@/types/basket-item.types"

export interface AddCartItemDto {
  title: string
  price: number
  image: string
  basketId: number
  productId: number
}

export interface ResponseAddCartItem extends Omit<IBasketItem, 'product'> {}