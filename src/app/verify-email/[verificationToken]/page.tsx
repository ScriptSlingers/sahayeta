'use client'
import { Player } from '@lottiefiles/react-lottie-player'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import failedGIF from '../../../../public/assets/img/failed.json'
import invalidGIF from '../../../../public/assets/img/invalid.json'
import verifiedGIF from '../../../../public/assets/img/verified.json'

export default function ResetPasswordPage({ params }: any) {
  const { status: sessionStatus } = useSession()
  const [sessionStat, setSessionStat] = useState('')
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch('/api/verify-email-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            verificationToken: params.verificationToken
          })
        })

        if (res.status === 400) {
          toast.error('Invalid token or hash expired')
          setSessionStat('invalid')
        }
        if (res.status === 200) {
          const userData = await res.json()
          const userId = userData.id
          try {
            const response = await fetch('/api/verify-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userId: userId
              })
            })
            if (response.ok) {
              toast.success('User account verified successfully')
              toast.success('Redirecting to Dashboard')
              setSessionStat('verified')
            }

            if (!response.ok) {
              setSessionStat('failed')
            }
          } catch (error) {
            toast.error('Error verifying email')
          }
        }
      } catch (error) {
        toast.error('Error, try again')
        setSessionStat('invalid')
      }
    }
    verifyToken()
  }, [params.verificationToken])

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {sessionStatus === 'loading' && <div>Loading</div>}
      {sessionStat === 'failed' && <Failed />}
      {sessionStat === 'invalid' && <Invalid />}
      {sessionStat === 'verified' && <Verified />}
    </div>
  )
}

const Failed = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Player
        autoplay
        loop
        src={failedGIF}
        style={{ height: '300px', width: '300px' }}
      />
      <div className="text-base font-medium text-blue-700">
        Could not find requested resource
      </div>
      <Link href="/login">
        <div className="flex  items-center justify-center rounded-xl bg-blue-700 px-2 py-4 text-base font-medium text-white">
          Return to Login
        </div>
      </Link>
    </div>
  )
}

const Invalid = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Player
        autoplay
        loop
        src={invalidGIF}
        style={{ height: '300px', width: '300px' }}
      />
      <div className="text-base font-medium text-blue-700">
        Invalid Token or Hash
      </div>
      <Link href="/login">
        <div className="flex w-44 items-center justify-center rounded-xl bg-blue-700 px-2 py-4 text-base font-medium text-white">
          Return to Login
        </div>
      </Link>
    </div>
  )
}

const Verified = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Player
        autoplay
        loop
        src={verifiedGIF}
        style={{ height: '300px', width: '300px' }}
      />
      <div className="text-base font-medium text-blue-700">
        Could not find requested resource
      </div>
      <Link href="/">
        <div className="flex w-44 items-center justify-center rounded-xl bg-blue-700 px-2 py-4 text-base font-medium text-white">
          Return to Dashboard
        </div>
      </Link>
    </div>
  )
}
