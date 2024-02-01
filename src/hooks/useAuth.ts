'use client'

import { useAppSelector } from "@/store/hooks"

export const useAuth = (): boolean => {
  const user = useAppSelector((state) => state.user.user)

  if (user) return true
  
  return false
}