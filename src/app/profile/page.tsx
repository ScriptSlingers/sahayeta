'use client'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import React, { useEffect, useState } from 'react'
import Campaigns from './Campaigns'
import Donations from './Donations'
import Profile from './Profile'
import { useClientSession } from '@sahayeta/utils'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const currentUser = useClientSession()

  const router = useRouter()
  useEffect(() => {
    if (!currentUser) {
      router.replace('/login')
    }
  }, [currentUser, router])
  const [selectedTab, setSelectedTab] = useState('profile')

  const handleTabClick = tab => {
    setSelectedTab(tab)
  }

  return (
    <div className="flex justify-center bg-blue-50 p-6">
      <div className="container flex w-full">
        <div className="flex w-1/6 flex-col divide-y-1 rounded-xl bg-slate-200 py-5 shadow">
          <button
            onClick={() => handleTabClick('profile')}
            className={`px-5 py-3 text-left font-medium ${
              selectedTab === 'profile'
                ? ' w-full bg-blue-700 text-white'
                : 'text-black'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => handleTabClick('editprofile')}
            className={`px-5 py-3 text-left font-medium ${
              selectedTab === 'editprofile'
                ? ' w-full bg-blue-700 text-white'
                : 'text-black'
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => handleTabClick('changepassword')}
            className={`px-5 py-3  text-left font-medium ${
              selectedTab === 'changepassword'
                ? ' w-full bg-blue-700  text-white'
                : ' text-black'
            }`}
          >
            Change Password
          </button>
          <button
            onClick={() => handleTabClick('campaigns')}
            className={`px-5 py-3  text-left font-medium ${
              selectedTab === 'campaigns'
                ? ' w-full bg-blue-700  text-white'
                : ' text-black'
            }`}
          >
            Campaign List
          </button>
          <button
            onClick={() => handleTabClick('donations')}
            className={`px-5 py-3  text-left font-medium ${
              selectedTab === 'donations'
                ? ' w-full bg-blue-700  text-white'
                : ' text-black'
            }`}
          >
            Donations List
          </button>
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
