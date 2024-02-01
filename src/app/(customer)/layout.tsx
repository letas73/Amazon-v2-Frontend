import type { Metadata } from 'next'
import Header from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'

export const metadata: Metadata = {
  title: 'Amazon Store'
}

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className='flex h-full'>
        <Sidebar />
        {children}
      </div>
    </>
  )
}
