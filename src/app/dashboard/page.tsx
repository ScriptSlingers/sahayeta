'use client'
import { useEffect, useState } from 'react'
import CampaignsListing from './CampaignList'
import CategoryEdit from './CategoryEdit'
import NotificationListing from './Notification'
import UsersListing from './UserList'
import { useClientSession } from '@sahayeta/utils'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const currentUser = useClientSession()

  const router = useRouter()
  useEffect(() => {
    if (currentUser?.role !== 'admin') {
      router.replace('/')
    }
  }, [currentUser, router])

  const [selectedTab, setSelectedTab] = useState('userlist')

  const handleTabClick = tab => {
    setSelectedTab(tab)
  }

  return (
    <div className="flex justify-center bg-blue-50 p-6 ">
      <div className="flex w-48 flex-col divide-y-1 rounded-xl bg-slate-200 py-5 shadow">
        <button
          onClick={() => handleTabClick('userlist')}
          className={`px-5 py-3 text-left font-medium ${
            selectedTab === 'userlist'
              ? ' w-full bg-blue-700 text-white'
              : 'text-black'
          }`}
        >
          Users List
        </button>
        <button
          onClick={() => handleTabClick('campaignlist')}
          className={`px-5 py-3 text-left font-medium ${
            selectedTab === 'campaignlist'
              ? ' w-full bg-blue-700 text-white'
              : 'text-black'
          }`}
        >
          Campaign List
        </button>
        <button
          onClick={() => handleTabClick('notification')}
          className={`px-5 py-3 text-left font-medium ${
            selectedTab === 'notification'
              ? ' w-full bg-blue-700 text-white'
              : 'text-black'
          }`}
        >
          {' '}
          Notification
        </button>
        <button
          onClick={() => handleTabClick('category')}
          className={`px-5 py-3 text-left font-medium ${
            selectedTab === 'category'
              ? ' w-full bg-blue-700 text-white'
              : 'text-black'
          }`}
        >
          {' '}
          Category
        </button>
      </div>
      <div>
        {selectedTab === 'userlist' && <UsersListing />}
        {selectedTab === 'campaignlist' && <CampaignsListing />}
        {selectedTab === 'notification' && <NotificationListing />}
        {selectedTab === 'category' && <CategoryEdit />}
      </div>
    </div>
  )
}
