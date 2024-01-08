import React, { useEffect, useState } from 'react'
import { MdAdminPanelSettings } from 'react-icons/md'
import axios from 'axios'
import Image from 'next/image'
import { GoOrganization } from 'react-icons/go'
import { IoMdContact } from 'react-icons/io'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { CiCalendarDate } from 'react-icons/ci'
import { FaRegAddressBook } from 'react-icons/fa'
import { MdOutlineDescription } from 'react-icons/md'
import { useClientSession } from '@sahayeta/utils'
import { MdOutlineMailOutline } from 'react-icons/md'

type loggedInUser = {
  id: string
  name: string
  orgName: string
  profileImage: string
  email: string
  role: string
  bio: string
  phoneNum: string
  address: string
  dob: string
  ctzImg: string
  balance: string
}

export default function Profile() {
  const currentUser = useClientSession()
  const [loggedInUser, setLoggedInUser] = useState<loggedInUser | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser?.id) {
          const response = await axios.get(`/api/users/${currentUser.id}`)
          const res = response.data
          setLoggedInUser(res)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()
  }, [currentUser?.id])

  return (
    <div className="bg-blue-50 rounded w-full  flex flex-col p-6 justify-center items-center">
      <div className="container flex items-center justify-center ">
        <div className="bg-slate-200 flex flex-col w-full py-5 items-center justify-center rounded-xl  ">
          <div className="flex flex-col items-center justify-center p-8 m-5 bg-white rounded-xl">
            <div className="relative w-32 h-32 border border-accent m-3 bg-slate-300 ">
              <Image
                src={loggedInUser?.profileImage || ''}
                alt="Profile image"
                fill
                className=""
              />
            </div>
            <figcaption className="text-black text-center text-xl font-semibold">
              {loggedInUser?.name}
            </figcaption>
            <div className="flex flex-col items-start justify-center">
              <div className="text-xl py-2 flex gap-2">
                <MdOutlineMailOutline className="mt-1.5" />
                Email:
                <span className="text-xl"> {loggedInUser?.email}</span>
              </div>
              <div className="text-xl py-2 flex gap-2">
                <MdAdminPanelSettings className="mt-1.5" />
                Role:
                <span className="text-xl"> {loggedInUser?.role}</span>
              </div>
              <div className="text-xl py-2 flex gap-2">
                <IoMdContact className="mt-1.5" />
                Contact:
                <span className="text-xl"> {loggedInUser?.phoneNum}</span>
              </div>
              <div className="text-xl py-2 flex gap-2">
                <FaRegAddressBook className="mt-1.5" />
                Address:
                <span className="text-xl"> {loggedInUser?.address}</span>
              </div>
              <div className="text-xl py-2 flex gap-2">
                <CiCalendarDate className="mt-1.5" />
                Date Of Birth:
                <span className="text-xl"> {loggedInUser?.dob}</span>
              </div>
              <div className="text-xl py-2 flex gap-2">
                <FaMoneyCheckAlt className="mt-1.5" />
                Balance:
                <span className="text-xl"> {loggedInUser?.balance}</span>
              </div>
              <div className="text-xl py-2 flex gap-2">
                <GoOrganization className="mt-1.5" />
                Organization Name:
                <span className="text-xl"> {loggedInUser?.orgName}</span>
              </div>
              <div className="text-xl py-2 flex gap-2">
                <MdOutlineDescription className="mt-1.5" />
                Bio:
                <span className="text-xl"> {loggedInUser?.bio}</span>
              </div>
              <div className="text-xl py-2">
                Citizenship Image:
                <span className="text-xl"> {loggedInUser?.ctzImg}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
