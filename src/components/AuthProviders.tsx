'use client'
import { FC, useEffect } from 'react'
import authService from '@/services/auth/auth.service'
import { useAppDispatch } from '@/store/hooks'
import { saveUser } from '@/store/user/user'
import { useMutation } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { clearFilters } from '@/store/filters/filters'

interface IProps {
  children: React.ReactNode
}

const AuthProviders: FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const { mutate } = useMutation({
    mutationKey: ['me'],
    mutationFn: () => authService.getMe(),
    onSuccess(data) {
      dispatch(saveUser(data))
    }
  })

  useEffect(() => {
    mutate()
  }, [])

  useEffect(() => {
    if (pathname !== '/catalog') {
      dispatch(clearFilters())
    }
  }, [pathname])

  return <div>
    {children}
  </div>
}

export default AuthProviders