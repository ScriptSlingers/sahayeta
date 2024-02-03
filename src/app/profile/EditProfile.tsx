'use client'
import { useClientSession } from '@sahayeta/utils'
import axios from 'axios'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaAddressBook, FaCalendarAlt, FaHeart } from 'react-icons/fa'
import { FaShield } from 'react-icons/fa6'

type loggedInUser = {
  id: string
  name: string
  username: string
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

export default function EditProfile() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    setSelectedFile(file || null)
  }

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)
    } else {
      console.log('No file selected!')
    }
  }

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

  const profileImageUrl = (loggedInUser?.profileImage || '/assets/img/avatar.jpg').replace(
    '=s96-c',
    '=s1000-c'
  )


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  const handleEdit = async values => {
    try {
      await axios.patch(
        `/api/users/${loggedInUser?.id}`,
        { ...values },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      ).then(response => {
        const updatedUser = response.data;
        console.log("updatedUser ==>>", updatedUser)
        console.log("values ==>>", values)
        setLoggedInUser(updatedUser);
      })


      toast.success(`User Edited Successfully`)
    } catch (error) {
      console.error('Error Editing user:', error)
    }
  }

  return (
    <div className="flex w-full flex-col  items-center justify-center rounded bg-blue-50">
      <div className="container flex items-center justify-center ">
        <div className="flex w-full flex-col rounded-xl bg-slate-200 p-5">
          <div className="relative sm:rounded-lg">
            <p className="py-4 text-lg font-bold text-blue-700">
              User Information
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 rounded-lg border bg-gray-50 p-3">
              <div className="relative h-24 w-24 rounded-full border border-accent bg-slate-300">
                <Image
                  src={profileImageUrl}
                  alt="Profile image"
                  fill
                  className="rounded-full"
                />
              </div>
              <div className="rounded-md">
                <p className="text-xl font-medium">{loggedInUser?.name}</p>
                <p className="text-md flex font-maven text-slate-500 gap-2 items-center">
                  <FaAddressBook />
                  {loggedInUser?.email}
                </p>
                <p className="text-md flex font-maven text-slate-500 gap-2 items-center">
                  <FaShield />
                  {loggedInUser?.role}
                </p>
              </div>
            </div>

            <div className="w-full">
              <h6 className="flex text-lg font-semibold">
                <FaCalendarAlt className="text-lg" />
                Edit Information
              </h6>
            </div>
            <div className="w-full text-left ">
              <form
                onSubmit={handleSubmit(handleEdit)}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-600 ">
                    Username
                  </label>
                  <input
                    disabled
                    className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                    type="text"
                    placeholder="Username"
                    defaultValue={loggedInUser?.username}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-600 ">
                    Name
                  </label>
                  <input
                    {...register('name')}
                    className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                    type="text"
                    placeholder="Full Name"
                    defaultValue={loggedInUser?.name}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-600 ">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                    type="email"
                    placeholder="Email"
                    defaultValue={loggedInUser?.email}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-600 ">
                    Phone
                  </label>
                  <input
                    {...register('phoneNum')}
                    className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                    type="text"
                    placeholder="Phone"
                    defaultValue={loggedInUser?.phoneNum}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-600 ">
                    Address
                  </label>
                  <input
                    {...register('address')}
                    className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                    type="text"
                    placeholder="Address"
                  />
                </div>
                <div className="mt-4 flex items-center justify-center gap-10 ">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? <>Updating...</> : <>Update</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
