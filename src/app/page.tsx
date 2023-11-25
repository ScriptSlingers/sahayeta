import Image from 'next/image';
import React from 'react';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { FaChildren } from 'react-icons/fa6';
import { GiBookCover } from 'react-icons/gi';
import { IoMdPaw } from 'react-icons/io';
import { FaMonument } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa';
export default function Page() {
  return (
    <>
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
                objectPosition="center"
                alt="Hero Section"
                width={300}
                height={200}
                className=""
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
                objectPosition="center"
                alt="Hero Section"
                width={300}
                height={200}
                className=""
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
                objectPosition="center"
                alt="Hero Section"
                width={300}
                height={200}
                className=""
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
      </div>
      <div className="pb-32 mb-10">
        <div className="flex flex-col py-14">
          <h1 className="flex justify-center text-black font-bold text-4xl">
            Causes you can raises funds for
          </h1>
          <p className="flex justify-center text-gray-400 font-semibold py-4">
            social cause, personal cause - you can count on us for the project
            that you want to raise funds for.
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2  ">
          <div className="flex flex-col bg-blue-500 shadow-2xl items-center justify-center font-semibold text-white px-6 py-4 w-48 h-40 rounded-lg hover:bg-transparent hover:border-blue-400 hover:text-blue-500 duration-300 hover:border border border-transparent">
            <div className="h-10 ">
              <FaBriefcaseMedical size={40} />
            </div>
            <h1>Medical</h1>
          </div>
          <div className="flex flex-col justify-center items-center shadow-2xl font-semibold text-white bg-blue-500 px-6 py-4 w-48 h-40 rounded-lg hover:bg-transparent hover:border-blue-400 hover:text-blue-500 duration-300 hover:border border border-transparent">
            <FaChildren size={40} />
            <h1>Children</h1>
          </div>
          <div className="flex flex-col justify-center items-center shadow-2xl font-semibold text-white  bg-blue-500 px-6 py-4 w-48 h-40 rounded-lg hover:bg-transparent hover:border-blue-400 hover:text-blue-500 duration-300 hover:border border border-transparent">
            <GiBookCover size={40} />
            <h1>Education</h1>
          </div>
          <div className="flex flex-col justify-center items-center shadow-2xl font-semibold text-white  bg-blue-500 px-6 py-4 w-48 h-40 rounded-lg hover:bg-transparent hover:border-blue-400 hover:text-blue-500 duration-300 hover:border border border-transparent">
            <IoMdPaw size={40} />
            <h1>Animal</h1>
          </div>
          <div className="flex flex-col justify-center items-center shadow-2xl font-semibold text-white  bg-blue-500 px-6 py-4 w-48 h-40 rounded-lg hover:bg-transparent hover:border-blue-400 hover:text-blue-500 duration-300 hover:border border border-transparent">
            <FaMonument size={40} />
            <h1>Memorial</h1>
          </div>
          <div className="flex flex-col justify-center items-center shadow-2xl font-semibold text-white  bg-blue-500 px-6 py-4 w-48 h-40 rounded-lg hover:bg-transparent hover:border-blue-400 hover:text-blue-500 duration-300 hover:border border border-transparent">
            <FaHandshake size={40} />
            <h1>Others</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-18">
        <h1 className="flex text-black font-bold text-xl px-28 ">
          Featured Topics
        </h1>

        <div className="flex flex-col py-10 pb-20">
          <div className="flex flex-row justify-center px-20 ">
            <Image
              src="/assets/img/child.jpg"
              objectPosition="center"
              alt="Hero Section"
              width={550}
              height={200}
              className=" shadow-2xl"
              quality={100}
            />
            <div className="flex flex-col py-14 px-20 w-1/2 bg-blue-500 rounded-r-lg shadow-2xl">
              <h1 className="flex justify-start text-white font-bold text-3xl">
                Look what we can help
              </h1>
              <p className="flex justify-center py-10  text-white">
                People across the country need help covering rent, food, and
                bills. Your donation to the Holiday Drive makes a difference
                this winter.
              </p>
              <div className="flex justify-start py-2">
                <button className="flex justify-center items-center font-semibold text-center bg-white text-blue-500 border-blue-500  shadow-lg hover:bg-transparent hover:text-white rounded-lg py-2 px-3 ">
                  See all donations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center mr-14">
        <div className="">
          <div className="flex flex-col py-14">
            <h1 className="flex text-black font-bold text-xl px-28 ">
              Fundraise for anyone
            </h1>
          </div>
          <div className="flex flex-col px-28 ">
            <h1 className="text-blue-500 font-bold text-2xl">Yourself</h1>
            <p className=" text-gray-500 text-xl py-8 ">
              Funds are delivered to your bank account for your own use
            </p>
          </div>
          <div className="flex flex-col px-28 py-14">
            <h1 className="text-blue-500 font-bold text-2xl">
              Family and friends
            </h1>
            <p className=" text-gray-500 text-xl py-8 ">
              Funds can be distributed and received
            </p>
          </div>
          <div className="flex flex-col px-28 ">
            <h1 className="text-blue-500 font-bold text-2xl">Charity</h1>
            <p className=" text-gray-500 text-xl py-8 ">
              Funds are delivered to your chosen nonprofit for you
            </p>
          </div>
        </div>
        <div className="">
          <Image
            src="/assets/img/plant.jpg"
            objectPosition="center"
            alt="Hero Section"
            width={550}
            height={100}
            className=" shadow-2xl rounded "
            quality={100}
          />
        </div>
      </div>
      <div className="flex justify-center py-14"></div>
    </>
  );
}
