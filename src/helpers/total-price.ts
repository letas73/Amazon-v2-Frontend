import { IBasketItem } from "@/types/basket-item.types";

export const totalPrice = (array: IBasketItem[]): number => {
  const totalPrice = array.reduce((sum, item) => item.price + sum, 0)

  return totalPrice
}