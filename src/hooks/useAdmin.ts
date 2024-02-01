import { useAppSelector } from "@/store/hooks"

export const useAdmin = (): boolean => {
  const user = useAppSelector((state) => state.user.user)

  if (user && user.role === 'ADMIN') return true

  return false
}