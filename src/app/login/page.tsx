'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import donationImage from '../../../public/assets/img/children.jpg'
import { useClientSession } from '../../utils'

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

  async function onSubmit(values) {
    await signIn('credentials', {
      ...values,
      callbackUrl: 'http://localhost:3000/'
    })
    console.log(values)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f4f1] ">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 overflow-hidden">
        <section className=" relative">
          <Image
            src={donationImage}
            alt="Login page image"
            className="w-[450px] h-full hidden md:block object-cover"
          />
        </section>

        <section className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <input
              {...register('email')}
              className="w-full border border-neutral-400 p-2 rounded-lg text-black text-sm mt-5"
              type="text"
              placeholder="Email"
              required
            />
            <input
              {...register('password')}
              className="w-full border border-neutral-400 p-2 rounded-lg text-black text-sm mt-5"
              type="text"
              placeholder="Password"
              required
            />

            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">Remember Me</span>
              </div>
              <a href="#" className="text-black text-md  hover:text-blue-500 ">
                Forget Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg mb-6 hover:bg-blue-400 "
            >
              {isSubmitting ? <>Signing In</> : <>Login</>}
            </button>
          </form>
          <p className="font-medium text-sm text-[#9A9A9A] text-center ">
            --- Or login with ---
          </p>
          <br />
          <button
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:text-black hover:bg-white border border-black"
            onClick={() =>
              signIn('google', { callbackUrl: 'https://localhost:3000/' })
            }
          >
            <FcGoogle className="w-6 g-6 inline mr-2" />
            Sign in with Google
          </button>
          <div className="text-center text-gray-600">
            Don&apos;thave an account?
            <a
              href="/signup"
              className="text-black text-md font-bold hover:text-blue-500 "
            >
              Sign Up
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
