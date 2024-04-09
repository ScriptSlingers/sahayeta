'use client'
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function Logout() {
  const session = useSession()
  signOut()
  return <>Signing out</>
}
