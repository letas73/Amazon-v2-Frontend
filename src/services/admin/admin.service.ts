import { instance } from "@/api/axios"
import { IAdminData } from './admin.interface'

class AdminService {
  async getData() {
    const { data } = await instance.get<IAdminData>('/admin')

    return data
  }
}

export default new AdminService()