'use client'
import LandingSection from '@sahayeta/components/LandingSection'
import { Search } from '@sahayeta/components'
import { useSession } from 'next-auth/react'

export default function HomePage() {
  const session = useSession()

  return (
    <>
      {JSON.stringify(session)}
      <LandingSection />
      {/* <Search /> */}
    </>
  )
}
