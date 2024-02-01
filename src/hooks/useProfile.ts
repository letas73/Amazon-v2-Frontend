'use client'

import { useAppSelector } from "@/store/hooks"

export const useProfile = () => {
  const user = useAppSelector((state) => state.user.user)

  return user
}