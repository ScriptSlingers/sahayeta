'use client'
import CampaignsListing from './CampaignList'
import NotificationListing from './Notification'
import UsersListing from './UserList'
import React, { useState } from 'react'

export default function TabSelector() {
    const [selectedTab, setSelectedTab] = useState('userlist')

    const handleTabClick = tab => {
        setSelectedTab(tab)
    }

    return (
        <div className=' flex justify-center  bg-blue-50 p-6 '>
            <div className='w-48 flex-col gap-8 shadow bg-slate-200 py-5 rounded-xl my-6 flex'>
                <button
                    onClick={() => handleTabClick('userlist')}
                    className={`text-left font-medium px-2${selectedTab === 'userlist' ? ' text-blue-700 shadow p-3 w-full rounded' : ''}`}
                >User List
                </button>

                <button

                    onClick={() => handleTabClick('campaignlist')}
                    className={`text-left font-medium px-2${selectedTab === 'campaignlist' ? ' text-blue-700 shadow p-3 w-full rounded' : ''}`}
                >       Campaign List
                </button>
                <button

                    onClick={() => handleTabClick('notification')}
                    className={`text-left font-medium px-2${selectedTab === 'notification' ? ' text-blue-700 shadow p-3 w-full rounded' : ''}`}
                >       Notification
                </button>
            </div>
            <div>
                {selectedTab === 'userlist' && <UsersListing />}
                {selectedTab === 'campaignlist' && <CampaignsListing />}
                {selectedTab === 'notification' && <NotificationListing />}
            </div>
        </div>
    )
}
