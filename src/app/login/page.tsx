'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import donationImage from '../../../public/assets/img/children.jpg'
import { useClientSession } from '../../utils'
import toast from 'react-hot-toast'

export default function Login(csrfToken) {
  const currentUser = useClientSession()

  const router = useRouter()
  useEffect(() => {
    if (currentUser) {
      router.replace('/')
    }
  }, [currentUser, router])

  const {
    handleSubmit,
    register,
    formState: { isSubmitting }
  } = useForm()

  async function onSubmit(values, e) {
    e.preventDefault() // Prevent default form submission behavior
    try {
      await signIn('credentials', {
        ...values,
        callbackUrl: 'http://localhost:3000/'
      })

      toast.success('Sign in successful')
      console.log(values)
    } catch (error) {
      toast.error('Error occurred during sign in')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f4f1] ">
      <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row">
        <section className=" relative">
          <Image
            src={donationImage}
            alt="Login page image"
            className="hidden h-full w-[450px] object-cover md:block"
          />
        </section>

        <section className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome to Sahayata</span>
          <span className="mb-8 font-light text-gray-400">
            Welcome back! Please enter your details
          </span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              {...register('email')}
              className="w-full rounded border border-neutral-400 p-3 text-sm text-black"
              type="text"
              placeholder="Email"
              required
            />
            <input
              {...register('password')}
              className="w-full rounded border border-neutral-400 p-3 text-sm text-black"
              type="password"
              placeholder="Password"
              required
            />

            <div className="flex w-full justify-between py-4">
              <div className="flex gap-2">
                <input type="checkbox" name="ch" id="ch" />
                <span className="text-md">Remember Me</span>
              </div>
              <a href="#" className="text-md text-black  hover:text-blue-500 ">
                Forget Password?
              </a>
            </div>

            <button
              type="submit"
              className="mb-6 w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-400 "
              disabled={isSubmitting}
            >
              {isSubmitting ? <>Signing In</> : <>Login</>}
            </button>
          </form>
          <p className="text-center text-sm font-medium text-[#9A9A9A] ">
            --- Or login with ---
          </p>
          <br />
          <button
            className="mb-6 w-full rounded-lg border border-black bg-black p-2 text-white hover:bg-white hover:text-black"
            onClick={() =>
              signIn('google', { callbackUrl: 'https://localhost:3000/' })
            }
          >
            <FcGoogle className="g-6 mr-2 inline w-6" />
            Sign in with Google
          </button>
          <div className="text-center text-gray-600">
            Don&apos;thave an account?
            <a
              href="/signup"
              className="text-md font-bold text-black hover:text-blue-500 "
            >
              {' '}
              Sign Up
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
