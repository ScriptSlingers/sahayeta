import Image from 'next/image'
import React from 'react'

export const FeaturedSection = () => {
  return (
    <div className="py-18 flex flex-col">
      <h1 className="flex px-28 text-xl font-bold text-black ">
        Featured Topics
      </h1>

      <div className="flex flex-col py-10 pb-20">
        <div className="flex flex-row justify-center px-20 ">
          <Image
            src="/assets/img/child.jpg"
            alt="Hero Section"
            width={550}
            height={200}
            className=" shadow-2xl"
            quality={50}
          />
          <div className="flex w-1/2 flex-col rounded-r-lg bg-blue-500 px-20 py-14 shadow-2xl">
            <h1 className="flex justify-start text-3xl font-bold text-white">
              Look what we can help
            </h1>
            <p className="flex justify-center py-10  text-white">
              People across the country need help covering rent, food, and
              bills. Your donation to the Holiday Drive makes a difference this
              winter.
            </p>
            <div className="flex justify-start py-2">
              <button className="flex items-center justify-center rounded-lg border-blue-500 bg-white px-3 py-2  text-center font-semibold text-blue-500 shadow-lg hover:bg-transparent hover:text-white ">
                See all donations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
