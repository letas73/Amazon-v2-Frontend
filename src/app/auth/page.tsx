import Auth from '@/components/auth/Auth'
import { Metadata } from 'next'
import { FC } from 'react'

export const metadata: Metadata = {
  title: 'Auth | Amazon Store'
}

const AuthPage: FC = () => {
  return <Auth />
}

export default AuthPage