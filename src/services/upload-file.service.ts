import { API_URL } from "@/constants/constants"
import axios from "axios"

class UploadFileService {
  async upload(files: any) {
    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    }

    console.log(files);

    const { data } = await axios.post<string[]>(`${API_URL}/upload`, files, config)

    return data
  }
}

export default new UploadFileService()