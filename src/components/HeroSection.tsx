import Image from 'next/image'
import React from 'react'

export const HeroSection = () => {
    return (
        <div className="w-full flex flex-col md:flex-row justify-center items-center text-black gap-6">
            <div className="w-full md:w-2/5 flex flex-col p-4 md:p-10 gap-4 md:gap-6">
                <div className="text-3xl md:text-5xl font-serif font-extralight">
                    Donation can change the world
                </div>
                <p className="text-xl md:text-2xl font-semibold text-blue-500">
                    Impower change through your generosity
                </p>
                <p className="text-base md:text-lg">
                    Welcome to Sahayata, where every act of kindness becomes a beacon of
                    hope.
                </p>
                <div className="flex">
                    <a
                        href="#"
                        className="items-center text-white bg-blue-600 rounded-3xl py-2 px-4 md:px-6 font-medium inline-block mr-4 hover:bg-transparent hover:border-blue-400 hover:text-black duration-300 hover:border border border-transparent"
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
