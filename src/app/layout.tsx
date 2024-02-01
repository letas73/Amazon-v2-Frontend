import type { Metadata } from 'next'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Providers from '@/components/Providers'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'Amazon Store',
  description: 'Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime. Enjoy low prices and great deals on the largest selection of everyday essentials and other products, including fashion, home, beauty, electronics, Alexa Devices, sporting goods, toys, automotive, pets, baby, books, video games, musical instruments, office supplies, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <ToastContainer
            autoClose={3000}
            position='bottom-left'
            closeOnClick
            pauseOnHover
            theme='dark'
          />
        </Providers>
      </body>
    </html>
  )
}
