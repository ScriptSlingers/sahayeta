import React from 'react';
import { TbAddressBook } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiOutlineRise } from "react-icons/ai";

export default function Userinfo() {
  return (
   <>
   <section className='border-2 border-slate-300'>
   <div className="flex items-center gap-3 ">
            <div className="w-[150px] h-[150px] border border-accent m-3 bg-slate-300 rounded-full">
            
            </div>
            <div className=" rounded-md p-2">
             <p className='font-bold text-2xl'>Sophia Browe</p>
             <p className='text-slate-500 font-maven text-md  flex '><TbAddressBook className='m-1'/>Bharatpur, Chitwan</p>
             <p className='text-slate-500 font-maven text-md  flex '><FaHeart className='m-1'/>Donor for 7 months</p>
            </div>
          </div>
   </section>
   <div className='flex'>
   <section className='w-1/5 border-2 border-t-0 border-slate-300 hidden md:block'>
        <div className=' text-slate-700 '>
          <div className='text-xl font-bold font-maven m-3 p-2 text-center flex gap-4 cursor-pointer'>
           <FaHome className='m-1'/> Dashboard
          </div>
          <div className='text-xl font-bold font-maven m-3 p-2 text-center flex gap-4 cursor-pointer'>
           <FaCalendarAlt className='m-1'/> Donation History
          </div>
          <div className='text-xl font-bold font-maven m-3 p-2 text-center flex gap-4 cursor-pointer'>
           <CgProfile className='m-1'/> Edit Profile
          </div>
        </div>
    </section>
    <section className='w-4/5'>
      <div className='text-black'>
      <div className='m-3 p-2'>
          <h6 className=' font-semibold text-lg  flex'><AiOutlineRise className='m-2 text-lg'/>Your Giving Status</h6>
        </div>
        <div className='bg-slate-200 border-2 border-slate-500 flex mx-7 p-3'>
          <div className='border-1 border-slate-400 bg-white m-2 text-center p-3 '>
              <p>4</p>
              <p>NUMBER OF DONATION</p>
          </div>  
          <div className='border-1 border-slate-400 bg-white m-2 text-center p-3'>
              <p>4</p>
              <p>LIFETIME DONATIONS</p>
          </div>  
          <div className='border-1 border-slate-400 bg-white m-2 text-center p-3'>
              <p>4</p>
              <p>AVERAGE DONATION</p>
          </div>
        </div>
      </div>
      <div className='bg-green-500'></div>

    </section>

   </div>
   </>
  )
}
