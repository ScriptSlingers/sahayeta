import Image from 'next/image';
import React from 'react';
export default function Page() {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-center items-center bg-indigo-100 text-black gap-6">
        <div className="w-full md:w-2/5 flex flex-col p-4 md:p-10 gap-4 md:gap-6">
          <div className="text-3xl md:text-5xl font-serif font-extralight">
            Donation can change the world
          </div>
          <p className="text-xl md:text-2xl font-semibold text-blue-500">
            Donation is a way of love
          </p>
          <p className="text-base md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex">
            <a
              href="#"
              className="items-center text-white bg-blue-600 rounded-3xl py-2 px-4 md:px-6 font-medium inline-block mr-4 hover:bg-transparent hover:border-purple-400 hover:text-black duration-300 hover:border border border-transparent"
            >
              Donate now
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative">
            <Image
              src="/assets/img/herosection.png"
              objectPosition="center"
              alt="Hero Section"
              width={500}
              height={300}
              className=""
              quality={100}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center p-3 md:p-5 bg-white-100">
        <div>Meta</div>
        <div>Khalti</div>
        <div>E-sewa</div>
        <div>Ime Pay</div>
      </div>
      <div className="flex bg-indigo-100 h-screen ">
        <div className="flex items-center md:text-xl md:w-2/5 flex-col md:p-10 md:gap-14">
        </div>
        <div className='e-card flex h-64 w-64 bg-black'>
          <div className='e-card-header'>
            <div className='e-card-header-caption'>Our Services
              <div className='e-card-header-title'>
                image
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
