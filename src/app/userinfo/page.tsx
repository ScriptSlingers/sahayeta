import React from 'react';
import { TbAddressBook } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiOutlineRise } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";

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
    <section className='w-4/5 text-black'> 
      <div className='m-2 p-2'>
          <h6 className=' font-semibold text-lg  flex'><AiOutlineRise className='m-2 text-lg'/>Your Giving Status</h6>
        </div>
        <div className=' ml-7 flex items-start justify-start'>
        <div className='bg-gray-100 border-2 border-slate-500 flex p-4 gap-5'>
          <div className='border-1 border-slate-400 bg-white text-center w-[150px] h-[150px] p-5'>
              <p className='text-blue-700 text-4xl'>4</p>
              <p className='text-lg font-maven'>NUMBER OF DONATION</p>
          </div>  
          <div className='border-1 border-slate-400 bg-white text-center w-[150px] h-[150px] p-5'>
              <p className='text-blue-700 text-4xl flex'><BsCurrencyDollar className='p-1'/>17k</p>
              <p className='text-lg font-maven'>LIFETIME DONATIONS</p>
          </div>  
          <div className='border-1 border-slate-400 bg-white  text-center w-[150px] h-[150px] p-5'>
              <p className='text-blue-700 text-4xl flex'><BsCurrencyDollar className='p-1'/>2.5k</p>
              <p className='text-lg font-maven'>AVERAGE DONATION</p>
          </div>
        </div>
      </div>
      <div className='m-3 p-2'>
          <h6 className='font-semibold text-lg  flex'><FaCalendarAlt className='m-2 text-lg'/>Recent Donations</h6>
        </div>
       <div className='border-1 border-slate-400 ml-7'>
        <div className='flex items-start justify-between bg-gray-200 border-1 border-b-slate-400 p-2 text-xl'>
         <div>DONATION</div>
         <div>FORM</div>
         <div>DATE</div>
         <div>STATUS</div>
        </div>
        <div className='flex items-center justify-between p-4 text-xl  border-1 border-b-slate-400 '>
         <div>$ 25.00</div>
         <div className='ml-8'>Donation </div>
         <div className='grid'>
          <span>March 19,2021</span>
          <span>12.27 pm</span>
         </div>
         <div className='flex'><FaCircle className='m-1 text-blue-800'/>Complete</div>
        </div>
        <div className='flex items-center justify-between p-4 text-xl  border-1 border-b-slate-400'>
         <div>$ 25.00</div>
         <div className='ml-8'>Donation </div>
         <div className='grid'>
          <span>March 19,2021</span>
          <span>12.27 pm</span>
         </div>
         <div className='flex'><FaCircle className='m-1 text-blue-800'/>Complete</div>
        </div>
        <div className='flex items-center justify-between p-4 text-xl border-1 border-b-slate-400'>
         <div>$ 25.00</div>
         <div className='ml-8'>Donation </div>
         <div className='grid'>
          <span>March 19,2021</span>
          <span>12.27 pm</span>
         </div>
         <div className='flex'><FaCircle className='m-1 text-blue-800'/>Complete</div>
        </div>
        <div className='flex items-center justify-between p-4 text-xl'>
         <div>$ 25.00</div>
         <div className='ml-8'>Donation </div>
         <div className='grid'>
          <span>March 19,2021</span>
          <span>12.27 pm</span>
         </div>
         <div className='flex'><FaCircle className='m-1 text-blue-800'/>Complete</div>
        </div>
       </div>
    </section>

   </div>
   </>
  )
}
