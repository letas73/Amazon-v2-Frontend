import { IUser } from "@/types/user.types"

export interface FormDataRegister {
  username: string
  email: string
  password: string
  phone: string
}

export interface FormDataLogin {
  email: string
  password: string
}

export interface AuthResponse {
  user: IUser
  accessToken: string
}