'use client'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import AuthProviders from './AuthProviders'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

interface IProps {
  children: React.ReactNode
}

const Providers: FC<IProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProviders>
          {children}
        </AuthProviders>
      </QueryClientProvider>
    </Provider>
  )
}

export default Providers