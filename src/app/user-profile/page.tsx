'use client'
import React, { useState } from 'react';
import Profile from './Editprofile';
import { FaHome } from 'react-icons/fa'
import { MdEdit } from "react-icons/md";
import { SiSpringsecurity } from "react-icons/si";
import { CgProfile } from 'react-icons/cg'
import Password from './Password';

const TabSelector = () => {
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="p-4 flex items-center justify-center ">
      <div className='flex w-[50%] border-2 border-slate-200 shadow-lg rounded-xl'>
        <section className=" w-1/5 flex flex-col items-start justify-start bg-blue-600 text-white rounded-l-xl">
          <div className=' p-6 text-white text-center  w-full'>
            <span className=' text-2xl font-xl font-bold'>SAHAYATA</span>
          </div>
          <div className='flex flex-col w-full text-lg font-semibold items-start justify-center '>
            <button
              className={`${selectedTab === 'Dashboard' ? 'text-2xl  text-white' : ''
                } px-4 py-2 flex gap-2`}
              onClick={() => handleTabClick('Dashboard')}
            >
              <FaHome className="mt-1.5" />  Dashboard
            </button>
            <button
              className={`${selectedTab === 'Profile' ? 'text-2xl text-white' : ''
                } px-4 py-2 flex gap-1`}
              onClick={() => handleTabClick('Profile')}
            >
              <CgProfile className="mt-1.5" /> Profile
            </button>
          </div>
        </section>
        <div className='w-4/5 ' >
          <div className='text-start p-5 border-1 border-slate-200 rounded shadow-md'>
            <span className='text-2xl font-semibold'>MY PROFILE</span>
          </div>
          <div className='flex'>
          <section className='w-2/5 '>
          <div className='flex flex-col w-full text-md font-semibold items-start  h-full border-r-1.5 shadow-md '>
            <button
              className={`${selectedTab === 'Edit' ? 'text-2xl  text-black' : ''
                } px-4 py-4 flex gap-2 border-2 border-l-slate-300 w-full`}
              onClick={() => handleTabClick('Edit')}
            >
              <MdEdit className="mt-1.5 text-xl" /> Edit Profile
            </button>
            <button
              className={`${selectedTab === 'Change' ? 'text-2xl text-black' : ''
                } px-4 py-4 w-full flex gap-1 border-2 border-l-slate-300`}
              onClick={() => handleTabClick('Change')}
            >
               <SiSpringsecurity className="mt-1.5 text-xl" /> Change Password
              </button>
              </div>
          </section>

          <section className=" w-full ">
            {selectedTab === 'tab1' && <p>Content for Tab 1</p>}
            {selectedTab === 'Edit' && <p><Profile /></p>}
            {selectedTab === 'Change' &&  <p><Password /></p>}
            {selectedTab === 'tab3' && <p>Content for Tab 3</p>}
          </section>
          <div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSelector;
