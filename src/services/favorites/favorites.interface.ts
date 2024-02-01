import { IFavoriteItem } from "@/types/favorite-item.types"

export interface AddFavoriteDto {
  title: string
  price: number
  image: string
  favoriteId: number
  productId: number
}

export interface ResponseAddFavorite extends Omit<IFavoriteItem, 'product'> {}