import Image from 'next/image'
import React from 'react'

export const TrendingSection = () => {
  return (
    <div>
      {' '}
      <div className="flex flex-col py-10">
        <h1 className="flex justify-center text-black font-bold text-4xl">
          Trending Fundraiser
        </h1>
        <p className="flex justify-center text-gray-400 py-4 font-semibold">
          View the fundraisers that are most active right now
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center ">
        <div className="flex">
          <div className="flex flex-row gap-14 justify-center w-full pb-2">
            <div className="flex flex-col rounded-b-lg w-1/3 justify-center shadow-2xl ">
              <Image
                src="/assets/img/children.jpg"
                alt="Hero Section"
                width={300}
                height={200}
                quality={100}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  School for special needs
                </div>
                <p className="text-gray-700 text-base">
                  School for special needs
                </p>
                <div className="flex justify-center  py-4">
                  <button className="flex justify-center items-center w-1/3 font-semibold bg-blue-500 text-white hover: border-blue-500 rounded py-1 hover:bg-transparent hover:text-black duration-300  ">
                    Donate
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-b-lg  w-1/3 justify-center shadow-2xl">
              <Image
                src="/assets/img/child.jpg"
                alt="Hero Section"
                width={300}
                height={200}
                quality={100}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  Education for needs
                </div>
                <p className="text-gray-700 text-base">Education for needs</p>
                <div className="flex justify-center py-4">
                  <button className="flex justify-center items-center w-1/3 font-semibold bg-blue-500 text-white border-blue-500 rounded py-1  ">
                    Donate
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-b-lg w-1/3 justify-center shadow-2xl">
              <Image
                src="/assets/img/girl.jpg"
                alt="Hero Section"
                width={300}
                height={200}
                quality={100}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Feed the hungry</div>
                <p className="text-gray-700 text-base">Feed the hungry</p>
                <div className="flex justify-center py-4">
                  <button className="flex justify-center items-center w-1/3 font-semibold bg-blue-500 text-white border-blue-500 rounded py-1 ">
                    Donate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-10">
        <button className="flex justify-center items-center font-semibold text-center bg-blue-500 text-white shadow-2xl rounded py-2 px-3 hover:bg-transparent hover:border-blue-400 hover:text-blue-500 duration-300 hover:border border border-transparent">
          See all donations
        </button>
      </div>{' '}
    </div>
  )
}
