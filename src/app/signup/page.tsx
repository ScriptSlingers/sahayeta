'use client'
import Image from 'next/image'
import Donation from '../../../public/assets/img/4002785.jpg'

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f4f1]">
      <div className="relative m-5 flex flex-col space-y-8 rounded-2xl bg-white shadow-2xl md:flex-row md:space-y-0 ">
        <section className=" relative">
          <Image
            src={Donation}
            alt="Signup page image"
            className="hidden h-full w-[450px] rounded-r-2xl object-cover pl-3 md:block"
          />
        </section>

        <section className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome to Shayata</span>
          <span className="mb-8 font-light text-gray-700">
            Create your account
          </span>
          <form action="#" className="flex flex-col">
            <input
              className="mt-5 w-full rounded-lg border border-neutral-400 p-2 text-sm text-black"
              id="email"
              type="text"
              placeholder="Full Name"
              required
            />
            <input
              className="mt-5 w-full rounded-lg border border-neutral-400 p-2 text-sm text-black"
              id="email"
              type="text"
              placeholder="Email"
              required
            />
            <input
              className="mt-5 w-full rounded-lg border border-neutral-400 p-2 text-sm text-black"
              id="password"
              type="text"
              placeholder="Password"
              required
            />

            <div className="flex w-full justify-between py-4">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">
                  I accept{' '}
                  <a href="#" className="font-bold text-blue-600">
                    Terms of service and privacy policy
                  </a>
                </span>
              </div>
            </div>

            <button className="mb-6 w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-400 ">
              Create Account
            </button>

            <div className="text-center text-gray-800">
              Already have an account?
              <a
                href="#"
                className="text-md font-bold text-black hover:text-blue-500 "
              >
                Login
              </a>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
