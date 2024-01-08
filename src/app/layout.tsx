import { AppHeader, AuthProvider, Footer } from '@sahayeta/components'
import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'SAHAYATA',
  description: 'Web based Dontation App'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader
          height={2}
          color="#2563EB"
          easing="cubic-bezier(0.53,0.21,0,1)"
        />
        <Toaster />
        <AuthProvider>
          <AppHeader />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
