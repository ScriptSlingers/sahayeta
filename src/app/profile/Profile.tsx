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
    <div className="flex w-full flex-col  items-center justify-center rounded bg-blue-50 p-6">
      <div className="container flex items-center justify-center ">
        <div className="flex w-full flex-col items-center justify-center rounded-xl bg-slate-200 py-5  ">
          <div className="m-5 flex flex-col items-center justify-center rounded-xl bg-white p-8">
            <div className="relative m-3 h-32 w-32 border border-accent bg-slate-300 ">
              <Image
                src={loggedInUser?.profileImage || ''}
                alt="Profile image"
                fill
                className=""
              />
            </div>
            <figcaption className="text-center text-xl font-semibold text-black">
              {loggedInUser?.name}
            </figcaption>
            <div className="flex flex-col items-start justify-center">
              <div className="flex gap-2 py-2 text-xl">
                <MdOutlineMailOutline className="mt-1.5" />
                Email:
                <span className="text-xl"> {loggedInUser?.email}</span>
              </div>
              <div className="flex gap-2 py-2 text-xl">
                <MdAdminPanelSettings className="mt-1.5" />
                Role:
                <span className="text-xl"> {loggedInUser?.role}</span>
              </div>
              <div className="flex gap-2 py-2 text-xl">
                <IoMdContact className="mt-1.5" />
                Contact:
                <span className="text-xl"> {loggedInUser?.phoneNum}</span>
              </div>
              <div className="flex gap-2 py-2 text-xl">
                <FaRegAddressBook className="mt-1.5" />
                Address:
                <span className="text-xl"> {loggedInUser?.address}</span>
              </div>
              <div className="flex gap-2 py-2 text-xl">
                <CiCalendarDate className="mt-1.5" />
                Date Of Birth:
                <span className="text-xl"> {loggedInUser?.dob}</span>
              </div>
              <div className="flex gap-2 py-2 text-xl">
                <FaMoneyCheckAlt className="mt-1.5" />
                Balance:
                <span className="text-xl"> {loggedInUser?.balance}</span>
              </div>
              <div className="flex gap-2 py-2 text-xl">
                <GoOrganization className="mt-1.5" />
                Organization Name:
                <span className="text-xl"> {loggedInUser?.orgName}</span>
              </div>
              <div className="flex gap-2 py-2 text-xl">
                <MdOutlineDescription className="mt-1.5" />
                Bio:
                <span className="text-xl"> {loggedInUser?.bio}</span>
              </div>
              <div className="py-2 text-xl">
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
