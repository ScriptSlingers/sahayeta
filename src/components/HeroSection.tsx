import Image from 'next/image'
import React from 'react'

export const HeroSection = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 text-black md:flex-row">
      <div className="flex w-full flex-col gap-4 p-4 md:w-2/5 md:gap-6 md:p-10">
        <div className="font-serif text-3xl font-extralight md:text-5xl">
          Donation can change the world
        </div>
        <p className="text-xl font-semibold text-blue-500 md:text-2xl">
          Impower change through your generosity
        </p>
        <p className="text-base md:text-lg">
          Welcome to Sahayata, where every act of kindness becomes a beacon of
          hope.
        </p>
        <div className="flex">
          <a
            href="#"
            className="mr-4 inline-block items-center rounded-3xl border border-transparent bg-blue-600 px-4 py-2 font-medium text-white duration-300 hover:border hover:border-blue-400 hover:bg-transparent hover:text-black md:px-6"
          >
            Donate now
          </a>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="relative">
          <Image
            src="/assets/img/herosection.png"
            alt="Hero Section"
            width={500}
            height={300}
            className=""
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}
