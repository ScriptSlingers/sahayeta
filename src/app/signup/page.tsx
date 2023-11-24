'use client'
import Image from 'next/image'
import Donation from '../../../public/assets/img/4002785.jpg'


export default function Signup() {
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f4f1]">
      <div className="relative flex flex-col m-5 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
        <section className=" relative">
          <Image
            src={Donation}
            alt="Signup page image"
            className="w-[450px] h-full hidden rounded-r-2xl pl-3 md:block object-cover"
          />
        </section>

        <section className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome to Shayata</span>
          <span className="font-light text-gray-700 mb-8">
            Create your account
          </span>
          <form action="#" className="flex flex-col">
          <input
              className="w-full border border-neutral-400 p-2 rounded-lg text-black text-sm mt-5"
              id="email"
              type="text"
              placeholder="Full Name"
              required
            />
            <input
              className="w-full border border-neutral-400 p-2 rounded-lg text-black text-sm mt-5"
              id="email"
              type="text"
              placeholder="Email"
              required
            />
            <input
              className="w-full border border-neutral-400 p-2 rounded-lg text-black text-sm mt-5"
              id="password"
              type="text"
              placeholder="Password"
              required
            />

            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">I accept <a href='#' className='text-blue-600 font-bold'>Terms of service and privacy policy</a></span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white p-2 rounded-lg mb-6 hover:bg-blue-400 ">
              Create Account
            </button>
            
            <div className="text-center text-gray-800">
              Already have an account?
              <a
                href="#"
                className="text-black text-md font-bold hover:text-blue-500 "
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
