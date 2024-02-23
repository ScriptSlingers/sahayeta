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
      <div className="flex w-48 flex-col rounded-xl divide-y-1 bg-slate-200 shadow py-5">
        <button
          onClick={() => handleTabClick('userlist')}
          className={`text-left font-medium px-5 py-3 ${selectedTab === 'userlist'
            ? ' w-full bg-blue-700 text-white'
            : 'text-black'
            }`}
        >
          Users List
        </button>
        <button
          onClick={() => handleTabClick('campaignlist')}
          className={`text-left font-medium px-5 py-3 ${selectedTab === 'campaignlist'
            ? ' w-full bg-blue-700 text-white'
            : 'text-black'
            }`}
        >
          Campaign List
        </button>
        <button
          onClick={() => handleTabClick('notification')}
          className={`text-left font-medium px-5 py-3 ${selectedTab === 'notification'
            ? ' w-full bg-blue-700 text-white'
            : 'text-black'
            }`}
        >
          {' '}
          Notification
        </button>
        <button
          onClick={() => handleTabClick('category')}
          className={`text-left font-medium px-5 py-3 ${selectedTab === 'category'
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
