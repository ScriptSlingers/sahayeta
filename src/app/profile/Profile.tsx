import { useClientSession } from '@sahayeta/utils'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  FaBuilding,
  FaCalendar,
  FaEnvelope,
  FaFileWord,
  FaImage,
  FaMap,
  FaMoneyBill,
  FaPhone,
  FaUser
} from 'react-icons/fa'
import { FaShield } from 'react-icons/fa6'

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
          const response = await axios.get(`/api/users/${currentUser?.id}`)
          const res = response.data
          setLoggedInUser(res)
          console.log(res)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()
  }, [currentUser?.id])

  const profileImageUrl = (loggedInUser?.profileImage || '/assets/img/avatar.jpg').replace(
    '=s96-c',
    '=s1000-c'
  )

  function formatDate(dob: any) {
    const date = new Date(dob)
    const formattedDate = date.toLocaleDateString() // This gets the date part

    return formattedDate
  }

  return (
    <div className="flex w-full flex-col  items-center justify-center rounded">
      <div className="container flex items-center justify-center ">
        <div className="flex w-full flex-col items-center justify-center rounded-xl bg-slate-200 px-4 py-4">
          <div className="flex w-full flex-col rounded-xl bg-white p-4 gap-4">
            <div className="relative h-56 w-56 rounded-lg bg-slate-300 ">
              <Image
                src={profileImageUrl}
                alt="Profile image"
                fill
                quality={100}
                className="rounded-lg border-4 border-accent/50"
              />
            </div>

            <div className="flex flex-col items-start justify-center">
              <span className="font-semibold text-xl text-newPrimary">User Profile Details:</span>

              <div className="flex gap-2 py-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaUser />
                  <span className="font-semibold">Name:</span>
                </div>
                <span className="text-lg"> {loggedInUser?.name}</span>
              </div>
              <div className="flex gap-2 py-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaEnvelope />
                  <span className="font-semibold">Email:</span>
                </div>
                <span className="text-lg">{loggedInUser?.email}</span>
              </div>

              <div className="flex gap-2 py-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaShield />
                  <span className="font-semibold">Role:</span>
                </div>
                <span className="text-lg">{loggedInUser?.role}</span>
              </div>

              <div className="flex gap-2 py-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaPhone />
                  <span className="font-semibold">Contact:</span>
                </div>
                <span className="text-lg">{loggedInUser?.phoneNum || "N/A"}</span>
              </div>

              <div className="flex gap-2 py-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaMap />
                  <span className="font-semibold">Address:</span>
                </div>
                <span className="text-lg">{loggedInUser?.address || "N/A"}</span>
              </div>

              <div className="flex gap-2 py-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaCalendar />
                  <span className="font-semibold">Date Of Birth:</span>
                </div>
                <span className="text-lg">{formatDate(loggedInUser?.dob) || "N/A"}</span>
              </div>

              <div className="flex gap-2 py-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaMoneyBill />
                  <span className="font-semibold">Balance:</span>
                </div>
                <span className="text-lg">NRs. {loggedInUser?.balance || "N/A"}</span>
              </div>

              <div className="flex gap-2 py-2 text-lg">
                <div className="flex items-center gap-2">
                  <FaBuilding />
                  <span className="font-semibold">Organization Name:</span>
                </div>
                <span className="text-lg">{loggedInUser?.orgName || "N/A"}</span>
              </div>

              <div className="flex gap-2 py-2 text-lg">
                <div className="flex items-start gap-2">
                  <FaFileWord />
                  <span className="font-semibold">Bio:</span>
                </div>
                <span className="text-lg text-justify pr-10">{loggedInUser?.bio || "N/A"}</span>
              </div>
              <div className="py-2 text-lg">
                <div className="flex items-start gap-2">
                  <FaImage />
                  <span className="font-semibold">Citizenship Image:</span>
                </div>
                <div className="relative h-56 w-96 rounded-lg bg-slate-300 ">
                  <Image
                    src={loggedInUser?.ctzImg || "/assets/img/placeholder.png"}
                    alt="Profile image"
                    fill
                    objectFit='cover'
                    quality={100}
                    className="rounded-lg border-4 border-accent/50"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
