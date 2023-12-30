'use client'
import React, { useState } from 'react';
import Profile from './Editprofile';
import { MdEdit } from "react-icons/md";
import { SiSpringsecurity } from "react-icons/si";
import Password from './Password';
import Donation from './Donation';

const TabSelector = () => {
  const [selectedTab, setSelectedTab] = useState('Dashboard');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="p-4 flex items-center justify-center">
      <div className='flex container  rounded-xl bg-white w-full overflow-hidden '>
        <div className=" w-1/5 flex flex-col bg-blue-600 text-white rounded-lg">
          <div className='p-6 text-white text-center  w-full'>
            <span className='text-2xl font-xl font-bold'>SAHAYATA</span>
          </div>
          <div className='flex flex-col w-full text-lg font-lg items-start justify-center '>
          <button
              className={`${selectedTab === 'Donation' ? 'text-md  text-white' : ''
                } px-2 py-4 flex gap-2  w-full`}
              onClick={() => handleTabClick('Donation')}
            >
              <MdEdit className="mt-1.5 text-xl" /> Donation
            </button>
            <button
              className={`${selectedTab === 'Edit' ? 'text-md text-white' : ''
                } px-2 py-4 flex gap-2  w-full`}
              onClick={() => handleTabClick('Edit')}
            >
              <MdEdit className="mt-1.5 text-xl" /> Edit Profile
            </button>
            <button
              className={`${selectedTab === 'Change' ? 'text-md text-white' : ''
                } px-2 py-4 w-full flex gap-1 `}
              onClick={() => handleTabClick('Change')}
            >
               <SiSpringsecurity className="mt-1.5 text-xl" /> Change Password
              </button>
          </div>
        </div>
        <div className='w-4/5' >
          <div className='text-start p-5 border-1 border-slate-200 rounded shadow-sm'>
            <span className='text-2xl font-semibold'>MY PROFILE</span>
          </div>
          <div className=" flex w-full bg-red-500">
            {selectedTab === 'Donation' && <p><Donation /></p>}
            {selectedTab === 'Edit' && <p><Profile /></p>}
            {selectedTab === 'Change' &&  <p><Password /></p>}
          <div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSelector;
