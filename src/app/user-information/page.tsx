'use client'
import ChangePassword  from './ChangePassword'
import EditProfile from './EditProfile'
import React, { useState } from 'react'
import Fundraiser from './Fundraiser'
import Donor from './Donor'
import Profile from './Profile'

export default function page() {
    const [selectedTab, setSelectedTab] = useState('profile')

    const handleTabClick = tab => {
        setSelectedTab(tab)
    }

    return (
        <div className=' flex justify-center  bg-blue-50 p-6 '>
            <div className='w-48 flex-col gap-8 shadow bg-slate-200 py-5 rounded-xl my-6 flex'>
            <button
                    onClick={() => handleTabClick('profile')} className=''
                > Profile
                </button>
                <button
                    onClick={() => handleTabClick('editprofile')} className=''
                >Edit Profile
                </button>

                <button

                    onClick={() => handleTabClick('changepassword')}
                >   Change Password
                </button>
                <button

                    onClick={() => handleTabClick('fundraiser')}
                >      Fundraiser
                </button>
                <button

                    onClick={() => handleTabClick('donor')}
                > Donor
                </button>
            </div>
            <div className='w-[60%]'>
            {selectedTab === 'profile' && <Profile/>}
                {selectedTab === 'editprofile' && <EditProfile />}
                {selectedTab === 'changepassword' && <ChangePassword/>}
                {selectedTab === 'fundraiser' && <Fundraiser />}
                {selectedTab === 'donor' && <Donor />}
            </div>
        </div>
    )
}
