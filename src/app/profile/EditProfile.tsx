import { useClientSession } from '@sahayeta/utils'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaAddressBook, FaUserEdit } from 'react-icons/fa'
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
  const [loggedInUser, setLoggedInUser] = useState<loggedInUser | null>(null)
  const currentUser = useClientSession()

  const [file, setFile] = useState<File>()

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
        toast.error('Error fetching user data. Please try again later.')
      }
    }

    fetchData()
  }, [currentUser?.id])

  const profileImageUrl = (
    loggedInUser?.profileImage || '/assets/img/avatar.jpg'
  ).replace('=s96-c', '=s1000-c')

  const handleImageUpload = (e: any) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: loggedInUser?.name,
      address: loggedInUser?.address,
      email: loggedInUser?.email,
      phoneNum: loggedInUser?.phoneNum,
      ctzImg: loggedInUser?.ctzImg
    }
  })

  const handleEdit = async values => {
    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })

      if (!res.ok) {
        throw new Error(await res.json())
      }
      const resData = await res.json()

      values.ctzImg = resData.path

      const editedValues = Object.fromEntries(
        Object.entries(values).filter(([key, value]) => value !== '')
      )

      const response = await axios.patch(
        `/api/users/${loggedInUser.id}`,
        editedValues,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      )

      const updatedUserData = response.data
      setLoggedInUser(updatedUserData)
      console.log(editedValues)
      toast.success(`Profile Updated Successfully`)
    } catch (error) {
      console.error('Error Editing Profile:', error)
      toast.error('Failed to update profile. Please try again later.')
    }
  }

  return (
    <div className="flex w-full flex-col  items-center justify-center rounded bg-blue-50">
      <div className="container flex items-center justify-start ">
        <div className="flex w-2/3 flex-col rounded-xl bg-slate-200 p-5">
          <div className="relative sm:rounded-lg">
            <p className="py-4 text-lg font-bold text-blue-700">
              User Information
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-lg border bg-gray-50 p-3">
              <div className="relative h-24 w-24 rounded-full border border-accent bg-slate-300">
                <Image
                  src={profileImageUrl}
                  alt="Profile image"
                  fill
                  className="rounded-full"
                />
              </div>
              <div className="ga-2 flex flex-col rounded-md">
                <p className="text-xl font-medium">{loggedInUser?.name}</p>
                <p className="text-md flex items-center gap-2 font-maven text-slate-500">
                  <FaAddressBook />
                  {loggedInUser?.email}
                </p>
                <p className="text-md flex items-center gap-2 font-maven text-slate-500">
                  <FaShield />
                  {loggedInUser?.role}
                </p>
              </div>
            </div>

            <div className="w-full">
              <h6 className="flex items-center gap-2 font-semibold">
                <FaUserEdit />
                <span>Edit Information</span>
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                    className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                    type="text"
                    placeholder="Address"
                    defaultValue={loggedInUser?.address}
                  />
                </div>
                <div className="flex w-full flex-col justify-start gap-3 md:w-1/2">
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      Edit Citizenship Image:
                    </span>
                    <span className="text-sm">
                      (Add front and back in same image)
                    </span>
                  </div>
                  <div className="flex w-full flex-col gap-10">
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      id="imageUpload"
                      required
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {file ? (
                      <div className="w-72 object-contain">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="Selected"
                          width={300}
                          height={200}
                          className=" flex items-center justify-center rounded-2xl  bg-slate-400 p-1"
                        />
                      </div>
                    ) : (
                      <div className="relative h-56 w-96 rounded-lg bg-slate-300 ">
                        <Image
                          src={
                            loggedInUser?.ctzImg ||
                            '/assets/img/placeholder.png'
                          }
                          alt="Profile image"
                          fill
                          objectFit="cover"
                          quality={100}
                          className="rounded-lg border-4 border-accent/50"
                        />
                      </div>
                    )}
                    <label
                      htmlFor="imageUpload"
                      className=" ml-20 flex h-[37px] w-[126px] cursor-pointer items-center  justify-center rounded-3xl bg-black px-4  py-2 text-white"
                    >
                      Upload
                    </label>
                    <p className="ml-16 pt-2 text-sm">Only JPG, PNG images </p>
                  </div>
                </div>
                <div className="ml-10 mt-4 flex items-center justify-start gap-10 ">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
