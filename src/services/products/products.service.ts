import { $api, instance } from "@/api/axios"
import { IProduct } from "@/types/product.types"
import { GetAllQueryParams, ProductCreateDto, ProductUpdateDto } from "./products.interface"

class ProductsService {
  async getAll(queryParams: GetAllQueryParams) {
    const { data } = await $api.get<IProduct[]>(`/product`, {
      params: queryParams
    })

    return data
  }

  async getById(id: number) {
    const { data } = await $api.get<IProduct>(`/product/${id}`)

    return data
  }

  async create(dto: ProductCreateDto) {
    return instance.post<IProduct>('/product', dto)
  }

  async update(dto: ProductUpdateDto) {
    return instance.patch(`/product/${dto.id}`, dto.body)
  }

  async remove(id: number) {
    return instance.delete<IProduct>(`/product/${id}`)
  }
}

export default new ProductsService()