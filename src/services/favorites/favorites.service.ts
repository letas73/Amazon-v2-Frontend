import { instance } from "@/api/axios";
import { AddFavoriteDto, ResponseAddFavorite } from "./favorites.interface";
import { IFavoriteItem } from "@/types/favorite-item.types";

class FavoritesService {
  async getAll(favoriteId?: number) { 
    const { data } = await instance.get<IFavoriteItem[]>(`/favorite-item/${favoriteId}`)

    return data
  }
  
  async add(dto: AddFavoriteDto) {
    const { data } = await instance.post<ResponseAddFavorite>('/favorite-item', dto)

    return data
  }

  async remove(id: number) {
    await instance.delete(`/favorite-item/${id}`)
  }
}

export default new FavoritesService()