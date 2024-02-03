'use client'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import React, { useState } from 'react'
import Campaigns from './Campaigns'
import Donations from './Donations'
import Profile from './Profile'

export default function ProfilePage() {
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
          <button onClick={() => handleTabClick('campaigns')} className={`text-left font-medium  px-5 py-3 ${selectedTab === 'campaigns'
            ? ' w-full bg-blue-700  text-white'
            : ' text-black'
            }`}>Campaign List</button>
          <button onClick={() => handleTabClick('donations')} className={`text-left font-medium  px-5 py-3 ${selectedTab === 'donations'
            ? ' w-full bg-blue-700  text-white'
            : ' text-black'
            }`}>Donations List</button>
        </div>
        <div className="w-5/6">
          {selectedTab === 'profile' && <Profile />}
          {selectedTab === 'editprofile' && <EditProfile />}
          {selectedTab === 'changepassword' && <ChangePassword />}
          {selectedTab === 'campaigns' && <Campaigns />}
          {selectedTab === 'donations' && <Donations />}
        </div>
      </div>
    </div>
  )
}
