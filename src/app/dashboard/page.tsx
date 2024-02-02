'use client'
import { useState } from 'react'
import CampaignsListing from './CampaignList'
import CategoryEdit from './CategoryEdit'
import NotificationListing from './Notification'
import UsersListing from './UserList'

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState('userlist')

  const handleTabClick = tab => {
    setSelectedTab(tab)
  }

  return (
    <div className=" flex justify-center  bg-blue-50 p-6 ">
      <div className="my-6 flex w-48 flex-col rounded-xl bg-slate-200 py-5 shadow">
        <button
          onClick={() => handleTabClick('userlist')}
          className={`text-left font-medium px-2${
            selectedTab === 'userlist'
              ? ' w-full bg-blue-700 px-5 py-3 text-white'
              : 'px-5 py-3 text-black'
          }`}
        >
          Users List
        </button>

        <button
          onClick={() => handleTabClick('campaignlist')}
          className={`text-left font-medium px-2${
            selectedTab === 'campaignlist'
              ? ' w-full bg-blue-700 px-5 py-3 text-white'
              : 'px-5 py-3 text-black'
          }`}
        >
          {' '}
          Campaign List
        </button>
        <button
          onClick={() => handleTabClick('notification')}
          className={`text-left font-medium px-2${
            selectedTab === 'notification'
              ? ' w-full bg-blue-700 px-5 py-3 text-white'
              : 'px-5 py-3 text-black'
          }`}
        >
          {' '}
          Notification
        </button>
        <button
          onClick={() => handleTabClick('category')}
          className={`text-left font-medium px-2${
            selectedTab === 'category'
              ? ' w-full bg-blue-700 px-5 py-3 text-white'
              : 'px-5 py-3 text-black'
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
