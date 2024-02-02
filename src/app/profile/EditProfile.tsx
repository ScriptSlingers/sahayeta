'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useClientSession } from '@sahayeta/utils'
import { TbAddressBook } from 'react-icons/tb'
import { FaHeart } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'

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
  return (
    <div className="flex w-full flex-col  items-center justify-center rounded bg-blue-50 p-6">
      <div className="container flex items-center justify-center ">
        <div className="flex w-full flex-col rounded-xl bg-slate-200 py-5  ">
          <div className="relative px-10 sm:rounded-lg">
            <p className="py-4 text-lg font-bold text-blue-700">
              User Information
            </p>
          </div>
          <div className="m-3">
            <div className="  mx-5 mb-3 flex items-center gap-3 rounded-md border bg-gray-50">
              <div className="relative m-3 h-24 w-24 rounded-full border border-accent bg-slate-300">
                <Image
                  src={loggedInUser?.profileImage || ''}
                  alt="Profile image"
                  fill
                  className="rounded-full"
                />
              </div>
              <div className=" rounded-md p-2">
                <p className="text-xl font-medium">{loggedInUser?.name}</p>
                <p className="text-md flex font-maven  text-slate-500 ">
                  <TbAddressBook className="m-1" />
                  {loggedInUser?.email}
                </p>
                <p className="text-md flex font-maven  text-slate-500 ">
                  <FaHeart className="m-1" />
                  {loggedInUser?.role}
                </p>
              </div>
            </div>

            <div className="w-full">
              <div className="p-4">
                <h6 className="flex text-lg font-semibold">
                  <FaCalendarAlt className="m-2 text-lg" />
                  Edit Information
                </h6>
              </div>
            </div>
            <div className="mb-2  w-full p-5 text-left ">
              <form action="#" className="flex flex-col">
                <div className="mt-2">
                  <p>Phone Number*</p>
                  <input
                    className="w-full rounded-lg border border-slate-400 bg-gray-50 p-2 text-sm text-black outline-none"
                    type="number"
                    name="phoneNum"
                    id="text"
                    required
                  />
                </div>
                <div className="mt-2">
                  <p>Date of Birth</p>
                  <input
                    className="w-full rounded-lg border border-slate-400 bg-gray-50 p-2 text-sm text-black outline-none"
                    type="date"
                    name="dob"
                    id="text"
                    required
                  />
                </div>

                <div className="mt-2">
                  <p>Address*</p>
                  <input
                    className="w-full rounded-lg border border-slate-400 bg-gray-50 p-2 text-sm text-black outline-none"
                    type="text"
                    id="text"
                    name="address"
                    required
                  />
                </div>
                <div className="mt-2 flex items-stretch gap-3">
                  <div className="flex-1  py-2 ">
                    <p>Role</p>
                    <input
                      className="w-full rounded-lg border border-slate-400 bg-gray-50 p-2 text-sm text-black outline-none"
                      type="text"
                      id="text"
                      name="role"
                      required
                    />
                  </div>
                </div>
                <div className="mt-2 flex items-stretch gap-3">
                  <div className="flex-1  py-2 ">
                    <p>Bio</p>
                    <textarea
                      className="w-full rounded-lg border border-slate-400 bg-gray-50 p-2 text-sm text-black outline-none"
                      id="text"
                      name="bio"
                      required
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-start justify-center pl-2 pt-3">
                  <span className="mb-2 font-maven text-lg">
                    Citizenship Image
                  </span>
                  <div className="  flex items-center justify-center gap-7">
                    <div className=" ">
                      <div className="relative h-52 w-72 rounded-md border bg-slate-300">
                        {selectedFile && (
                          <Image
                            src={URL.createObjectURL(selectedFile)}
                            alt="Citizenship image"
                            fill
                            className=""
                          />
                        )}
                      </div>
                      <input
                        type="file"
                        name="ctzImg"
                        onChange={handleFileChange}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
                <button className="mb-4 mt-5 w-fit rounded-lg bg-blue-800 p-2 text-white hover:bg-blue-500 ">
                  Update Information
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
