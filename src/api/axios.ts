import axios, { CreateAxiosDefaults } from 'axios'
import { errorCatch, getContentType } from './api.helper'
import { API_URL } from '@/constants/constants'
import authService from '@/services/auth/auth.service'
import { getAccessToken, removeFromStorage } from '@/helpers/tokens.helper'

const axiosOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: getContentType(),
  withCredentials: true,
}

export const $api = axios.create(axiosOptions)

export const instance = axios.create(axiosOptions)

instance.interceptors.request.use(config => {
  const accessToken = getAccessToken()

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

instance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    console.log("Сработал оригинальный запрос!!!!");
    
    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await authService.getNewTokens()
        return instance.request(originalRequest)
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') removeFromStorage()
      }
    }

    throw error
  }
)