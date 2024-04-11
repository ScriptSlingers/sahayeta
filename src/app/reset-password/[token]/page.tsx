'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface UserData {
  email: string
  password: string
}

export default function ResetPasswordPage({ params }: any) {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [passwordVisible, setPasswordVisible] = useState(false)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch('/api/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: params.token
          })
        })

        if (res.status === 400) {
          toast.error('Invalid token or hash expired')
        }
        if (res.status === 200) {
          const userData = await res.json()
          setUser(userData)
        }
      } catch (error) {
        toast.error('Error, try again')
      }
    }
    verifyToken()
  }, [params.token])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const password = e.target[0].value
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          email: user?.email
        })
      })

      if (res.status === 400) {
        toast.error('Something went wrong, Please try again')
      }
      if (res.status === 200) {
        toast.success('Password updated successfully')
        router.push('/login')
      }
    } catch (error) {
      toast.error('Error, try again')
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState)
  }

  return (
    <div className="font-Roboto mx-auto my-20 flex w-1/3 flex-col gap-5 rounded-xl border p-10 py-12 shadow-xl">
      <div className="flex flex-col gap-3">
        <span className="text-4xl font-bold">Reset Password</span>
        <span className="font-light text-gray-400">
          Enter your new password
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Enter Your New Password"
            className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
            id="password"
            pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Password must be at least 8 characters long, contain at a capital letter,number, and special character."
          />
          <span
            className="absolute right-4 top-3.5 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-white"
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
