import React from 'react';
import { BsBriefcaseFill } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillSetting } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { BsFillBookmarkFill } from 'react-icons/bs';

export default function Profile() {
  return (
    <>
      <div className=' flex'>
        <section className='w-1/5 bg-blue-600'>
          <div className='m-3 p-2 '>
            <h1 className='text-white font-bold text-3xl text-center cursor-pointer'>Sahayata</h1>
          </div>
          <div className=' m-3 p-2  text-white'>
            <div className='text-xl font-bold font-maven m-3 p-2 text-center flex gap-4 cursor-pointer'>
              <BsBriefcaseFill className='m-1' /> Fundraising
            </div>
            <div className='text-xl font-bold font-maven m-3 p-2 text-center flex gap-4 cursor-pointer'>
              <BsFillPersonFill className='m-1' /> Profile
            </div>
            <div className='text-xl font-bold font-maven m-3 p-2 text-center flex gap-4 cursor-pointer'>
              <MdDashboard className='m-1' /> Connected Apps
            </div>
            <div className='text-xl font-bold font-maven m-3 p-2 text-center flex gap-4 cursor-pointer'>
              <BsFillBookmarkFill className='m-1' /> Payment
            </div>
            <div className='text-xl font-bold font-maven m-3 p-2 text-center flex gap-4 cursor-pointer'>
              <AiFillSetting className='m-1' /> Settings
            </div>

          </div>
        </section>
        <section className='w-4/5'>
          <div className='m-2'>
            <div className="mb-3 md:w-96 ml-5 ">
              <div className="relative mb-4 flex w-full flex-wrap gap-[1px] items-stretch">
                <input type="search" className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon1" />
                <button className=" bg-blue-800 text-white p-2 hover:bg-blue-500 rounded-r-lg">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className='flex bg-[#f9f4f1]'>
            <div className='w-2/4 m-12' >
              <div className="w-full bg-white rounded-lg mb-2  p-5 shadow-md hover:border-2 border-slate-900">
                <div className='font-bold font-maven text-xl'>Account Setting</div>
                <div className='font-maven  text-slate-500'>Details about your Personal information</div>
              </div>
              <div className="w-full bg-white rounded-lg mb-2 text-left p-5 shadow-md hover:border-2 border-slate-900">
                <div className='font-bold font-maven text-xl'>Notification</div>
                <div className='font-maven text-slate-500'>Get Notification of campign</div>
              </div>
              <div className="w-full bg-white rounded-lg mb-2 text-left p-5 shadow-md hover:border-2 border-slate-900">
                <div className='font-bold font-maven text-xl'>Donation History</div>
                <div className='font-maven  text-slate-500'>View donations and receipts</div>
              </div>
              <div className="w-full bg-white rounded-lg mb-2 text-left p-5 shadow-md hover:border-2 border-slate-900">
                <div className='font-bold font-maven text-xl'>Password & Security</div>
                <div className='font-maven text-slate-500'>Manage your profile security</div>
              </div>
            </div>
            <div className='w-2/4  m-12 '>
              <div className="flex bg-white rounded-lg mb-6  p-5 shadow-md  gap-7 ">
                <div className="flex  gap-3 ">
                  <div className='bg-[#f1f1f1] h-12 w-12 items-center border-3 border-solid border-white rounded-[50%] flex justify-center'>svg</div>
                  <div>
                    <div className=' font-maven text-lg font-semibold'>Upload a New Photo</div>
                    <div className='font-maven italic text-sm text-slate-500'>Profile-pic.jpg</div>
                  </div>
                </div>
                <div className="flex ml-12">
                  <button className=" bg-white text-black py-2 px-3 border-1 border-black hover:border-2 hover:border-blue-800 rounded-lg">
                    Update
                  </button>
                </div>

              </div>
              <div className="w-full bg-white rounded-lg mb-2 text-left p-5 shadow-md">
                <h1 className='font-maven text-lg font-semibold'>Change User Information here</h1>
                <form action="#" className='flex flex-col'>
                  <div className='flex items-stretch gap-3 mt-2'>
                    <div className="flex-1  py-2 ">
                      <p>Full Name*</p>
                      <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                        type="text"
                        id='text'
                        required />
                    </div>
                    <div className="flex-1  py-2 ">
                      <p>Last Name*</p>
                      <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                        type="text"
                        id='text'
                        required />
                    </div>
                  </div>
                  <div className='mt-2'>
                    <p>Address*</p>
                    <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                      type="text"
                      id='text'
                      required />
                  </div>
                  <div className='flex items-stretch gap-3 mt-2'>
                    <div className="flex-1  py-2 ">
                      <p>City</p>
                      <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                        type="text"
                        id='text'
                        required />
                    </div>
                    <div className="flex-1  py-2 ">
                      <p>State/Province</p>
                      <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                        type="text"
                        id='text'
                        required />
                    </div>
                  </div>
                  <div className='flex items-stretch gap-3 mt-2'>
                    <div className="flex-1  py-2 ">
                      <p>Zip Code</p>
                      <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                        type="text"
                        id='text'
                        required />
                    </div>
                    <div className="flex-1  py-2 ">
                      <p>Country</p>
                      <input className='w-full border border-slate-800 p-2 rounded-lg text-black text-sm '
                        type="text"
                        id='text'
                        required />
                    </div>
                  </div>
                  <button className="w-full bg-blue-800 text-white p-2 rounded-lg mb-4 mt-5 hover:bg-blue-500 ">
                    Update Information
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
