import AppHeader from '@sahayeta/components/AppHeader'
import './globals.css'
import type { Metadata } from 'next'
import { Footer } from '@sahayeta/components'
import { Providers } from '@sahayeta/components/provider'

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
        <Providers>
          <AppHeader />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
