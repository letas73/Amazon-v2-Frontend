import { $api, instance } from "@/api/axios"
import { ICategory } from "@/types/category.types"
import { UpdateCategoryDto } from "./categories.interface"

class CategoriesService {
  async getAll() {
    const { data } = await $api.get<ICategory[]>('/category')

    return data
  }

  async create(name: string) {
    return instance.post('/category', { name })
  }

  async update(dto: UpdateCategoryDto) {
    return instance.patch(`/category/${dto.id}`, {name: dto.name})
  }

  async remove(id: number) {
    return instance.delete(`/category/${id}`)
  }
}

export default new CategoriesService()