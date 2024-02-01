import { IBasket } from "./basket.types"
import { IFavorite } from "./favorite.types"

export interface IUser {
  id: number
  createdAt: string
  updatedAt: string
  username: string
  email: string
  avatarImg?: string
  phone: string
  role: string
  favorite: IFavorite
  basket: IBasket
}