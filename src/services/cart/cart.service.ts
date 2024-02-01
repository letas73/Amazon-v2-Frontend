import { instance } from "@/api/axios";
import { AddCartItemDto, ResponseAddCartItem } from "./cart.interface";
import { IBasketItem } from "@/types/basket-item.types";

class CartService {
  async getAll(basketId?: number) { 
    const { data } = await instance.get<IBasketItem[]>(`/basket-item/${basketId}`)

    return data
  }
  
  async add(dto: AddCartItemDto) {
    const { data } = await instance.post<ResponseAddCartItem>('/basket-item', dto)

    return data
  }

  async remove(id: number) {
    await instance.delete(`/basket-item/${id}`)
  }
}

export default new CartService()