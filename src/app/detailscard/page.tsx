'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ProfileIcon } from '../../icons'
import {BsFlag} from 'react-icons/bs';

export default function Card() {
  const [showFullContent, setShowFullContent] = useState(false)
  const content = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pellentesque sapien ac quam dignissim, id ullamcorper sem lacinia. Nam in lacus accumsan, tempus eros eu, vulputate nisl. Proin vehicula arcu nec orci auctor, vitae volutpat turpis eleifend. Vivamus tristique urna non massa finibus, et scelerisque dolor volutpat. Duis condimentum felis ut lectus commodo, et facilisis nibh tristique. Quisque sed mi eget justo auctor porttitor vitae in leo. Sed a sapien ac velit vestibulum cursus. Quisque quis consequat arcu. Proin et quam eros. Vestibulum tempus convallis risus a aliquam. Proin in dui euismod, commodo arcu a, venenatis neque.
      `

  const shortContent = content.slice(0, 200)

  const toggleContent = () => {
    setShowFullContent(!showFullContent)
  }

  return (
    <>
      <div className="container flex gap-7 ">
        <div className="lg:w-2/3 sm:w-full flex flex-col p-10 gap-6 ">
          <div className="text-xl font-maven font-semibold">
            Fund For Children
          </div>
          <div className="relative flex h-96 ">
            <Link href="/">
              <Image
                src="/assets/img/card.jpg"
                alt="logo"
                fill
                className="object-cover rounded-xl"
              />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border border-accent p-3 rounded-full">
              <Link href="#">
                <ProfileIcon />
              </Link>
            </div>
            <div className=" rounded-md p-2">
              Anjali Poudel is organizing this fundraiser.
            </div>
          </div>
          <div className="border-b border-slate-500"></div>
          <div>Hello my name is Anjali,</div>
          <div className="text-justify">
            {showFullContent ? content : shortContent}
            {content.length > 200 && (
              <button
                onClick={toggleContent}
                className="text-blue-700 flex gap-6 underline "
              >
                {showFullContent ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
          <div className="lg:flex  gap-3 items-center justify-center bg-white  shadow rounded w-full p-3 ">
            <div>
              <div className="relative flex w-20 h-20 ">
                <Link href="/">
                  <Image
                    src="/assets/img/donateicon.png"
                    alt="logo"
                    fill
                    className="object-cover rounded-full"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-semibold font-maven text-lg">
                `Give $20 and be a founding donor`
              </div>
              <div className="text-slate-600">
                Your donation is the start of Anjali&apos;s journey to success.
                Your early support inspires others to donate.
              </div>
              <button className="w-full bg-[#fdb72f] text-black p-2 rounded-lg mb-6 hover:bg-orange-300 ">
              Make a donation
            </button>
            </div>
          </div>
          <div className="border-b border-slate-500"></div>
          <div className="flex flex-col gap-2">
              <div className="font-bold font-maven text-lg">
                Organizer
              </div>
              <div className="flex  gap-7">
            <div className="w-12 h-12 bg-slate-300 border border-accent p-3 rounded-full">
              
            </div>
            <div className=" rounded-md ">
             <div className=' font-semibold font-maven text-lg mb-2'>Anjali Poudel</div>
             <div className='text-slate-800'>Organizer</div>
             <div className='text-slate-800 mb-5'>Bharatpur, Chitwan</div>
             <button className="w-fit  bg-white text-black p-2 px-5 border-1 border-black rounded-lg mb-6 hover:bg-orange-300 ">
              Contact
            </button>
            </div>
            </div>
            <div className="border-b border-slate-500"></div>
              <div className='flex gap-5 m-2'>
                <p>August 21st,2023</p>
                <li className='underline'><a href="">Wishes</a></li>
            </div>
            <div className="border-b border-slate-500"></div>
              <div className='flex gap-4 m-2 items-center'><BsFlag className='text-2xl'/>
              <p>Report Fundraiser</p>
              </div>
          </div>
        </div>
        <div className=" lg:w-1/3 h-fit relative flex flex-col m-7 mt-12 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
        <section className="flex flex-col p-8 m-2 md:p-10">
          <span className="mb-3 text-slate-500">$500,000 CAD goal</span>

          <button className="w-full bg-gradient-to-t from-orange-400 to-yellow-300 border text-black p-2 rounded-lg mb-2 mt-2 hover:border-2">Share </button> 
          <button className="w-full bg-gradient-to-b from-orange-400 to-yellow-400 border text-black p-2 rounded-lg mb-2 mt-2 hover:border-2">Donate now </button> 
          <div className="flex items-center gap-3 mt-2 mb-2">
            <div className="w-12 h-12 border border-accent p-3 bg-slate-300 rounded-full">
            
            </div>
            <div className=" rounded-md p-2">
             <p className='font-medium'>Become the first supporter</p>
             <p className='text-slate-500 font-maven text-sm mt-1'>Your Donation matters</p>
            </div>
          </div>
          <div className='mt-2'>
            <h1 className='font-medium mb-2'>Sahayata protects your donation</h1>
            <div>We gurantee you a full refund for up to a year in the rare case that fraud occurs. <a href="#" className='underline hover:text-blue-500'> See our Sahayata Giving Gurantee.</a></div>
          </div>
        </section>
        </div>
      </div>  
    </>
  )
}
