'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const router = useRouter()

  const { status: sessionStatus } = useSession()

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [sessionStatus, router])

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const email = e.target[0].value

    if (!isValidEmail(email)) {
      toast.error('Email is invalid')
      return
    }

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      })

      if (res.status === 400) {
        toast.error('User with this email is not registered.')
      } else if (res.status === 200) {
        const { resetUrl } = await res.json()
        const emailRes = await fetch('/api/send-reset-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            resetUrl
          })
        })
        if (emailRes.status === 200) {
          toast.success('Password reset token has been sent.')
          router.push('/login')
        }
      }
    } catch (error) {
      toast.error('Something went wrong, Try again later')
    }
  }

  return (
    <div className="font-Roboto mx-auto my-20 flex w-1/3 flex-col gap-5 rounded-xl border p-10 py-12 shadow-xl">
      <div className="flex flex-col gap-3">
        <span className="text-4xl font-bold">Forget Password</span>
        <span className="font-light text-gray-400">
          Enter email to send the reset link.
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="Enter Your Email Here"
          className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
          id="password"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-white "
        >
          Reset Password
        </button>
      </form>
      <Link
        href="/login"
        className="flex flex-col items-center justify-center gap-1 md:flex-row"
      >
        <span>Want to login to the account?</span>
        <button className="text-base text-blue-600 ">Login</button>
      </Link>
    </div>
  )
}
