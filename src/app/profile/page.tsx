'use client'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import React, { useState } from 'react'
import Fundraiser from './Fundraiser'
import Donor from './Donor'
import Profile from './Profile'

export default function Page() {
  const [selectedTab, setSelectedTab] = useState('profile')

  const handleTabClick = tab => {
    setSelectedTab(tab)
  }

  return (
    <div className="flex justify-center bg-blue-50 p-6">
      <div className='flex w-full container'>
        <div className="flex w-1/6 flex-col rounded-xl divide-y-1 bg-slate-200 py-5 shadow">
          <button onClick={() => handleTabClick('profile')} className={`text-left font-medium px-5 py-3 ${selectedTab === 'profile'
            ? ' w-full bg-blue-700 text-white'
            : 'text-black'
            }`}>
            Profile
          </button>
          <button onClick={() => handleTabClick('editprofile')} className={`text-left font-medium px-5 py-3 ${selectedTab === 'editprofile'
            ? ' w-full bg-blue-700 text-white'
            : 'text-black'
            }`}>
            Edit Profile
          </button>
          <button onClick={() => handleTabClick('changepassword')} className={`text-left font-medium  px-5 py-3 ${selectedTab === 'changepassword'
            ? ' w-full bg-blue-700  text-white'
            : ' text-black'
            }`}>
            Change Password
          </button>
          <button onClick={() => handleTabClick('fundraiser')} className={`text-left font-medium  px-5 py-3 ${selectedTab === 'fundraiser'
            ? ' w-full bg-blue-700  text-white'
            : ' text-black'
            }`}>Fundraiser</button>
          <button onClick={() => handleTabClick('donor')} className={`text-left font-medium  px-5 py-3 ${selectedTab === 'donor'
            ? ' w-full bg-blue-700  text-white'
            : ' text-black'
            }`}> Donor</button>
        </div>
        <div className="w-5/6">
          {selectedTab === 'profile' && <Profile />}
          {selectedTab === 'editprofile' && <EditProfile />}
          {selectedTab === 'changepassword' && <ChangePassword />}
          {selectedTab === 'fundraiser' && <Fundraiser />}
          {selectedTab === 'donor' && <Donor />}
        </div>
      </div>
    </div>
  )
}
