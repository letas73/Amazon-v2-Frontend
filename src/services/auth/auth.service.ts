import { $api, instance } from "@/api/axios";
import { AuthResponse, FormDataLogin, FormDataRegister } from "./auth.types";
import { removeFromStorage, saveTokenStorage } from "@/helpers/tokens.helper";
import { IUser } from "@/types/user.types";

export enum EnumTokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken'
}

class AuthService {
  async register(formData: FormDataRegister) {
    const { data } = await $api.post<AuthResponse>('/auth/register', formData)

    if (data.accessToken) saveTokenStorage(data.accessToken)

    return data 
  }

  async login(formData: FormDataLogin) {
    const { data } = await $api.post<AuthResponse>('/auth/login', formData)

    if (data.accessToken) saveTokenStorage(data.accessToken)
    
    return data
  }
  
  async getNewTokens() {
    const { data } = await $api.post<AuthResponse>('/auth/login/access-token')

    if (data.accessToken) saveTokenStorage(data.accessToken)

    return data
  }

  async getMe() {
    const { data } = await instance.get<IUser>('/auth/me')

    return data
  }

  async logout() {
    const { data } = await $api.post<boolean>('/auth/logout')

    if (data) removeFromStorage()
    
    return data
  }
}

export default new AuthService()