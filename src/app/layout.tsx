import { AppHeader, AuthProvider, Footer } from '@sahayeta/components'
import type { Metadata } from 'next'
import './globals.css'

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
        <AuthProvider>
          <AppHeader />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
