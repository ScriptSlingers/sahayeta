'use client'

import { useClientSession } from '@sahayeta/utils'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type UserType = {
  id: string;
  username: string;
  email: string;
  name: string;
  address: string;
  phoneNum: string;
  bio: string;
  profileImage: string;
  dob: string;
  ctzImg: string | null;
  balance: number;
  orgName: string;
  createdAt: string;
  updatedAt: string | null;
  role: "admin" | "charity" | "donor" | "fundraiser";
};

export default function Page() {
  const currentUser = useClientSession()
  const userId = currentUser?.id
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    try {
      axios
        .get(`/api/userProfile`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Axios error:', error);
          toast.error('Error fetching user data. Please try again.');
        });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  }, [userId]);
  console.log(user)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: user?.name

    }
  })

  const updateUser = async values => {
    try {
      await axios.patch(
        `/api/userProfile`,
        { ...values },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      )
      toast.success(`User Edited Successfully`)
    } catch (error) {
      console.error('Error Editing user:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f4f1] ">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
        <section className="flex flex-col justify-center items-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">
            Complete this form before initiating the campaign.
          </span>
          <span className="font-medium text-red-600 mt-2">
            All fields must be filled out.
          </span>
          <div className="font-medium text-blue-700 text-base">
          </div>
          <form onSubmit={handleSubmit(updateUser)}
            className="flex flex-col">
            <div className="mt-2 ">
              <label>Full Name</label>
              <input
                {...register('name')}
                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                type="text"
                defaultValue={user?.name}
                placeholder="Enter Your Full Name"
                required
              />
            </div>
            <div className="mt-2">
              <p>Date of Birth</p>
              <input
                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                type="text"
                placeholder="Enter Your Date Of Birth"
                required
              />
            </div>
            <div>
              <div className="mt-2">
                <p>Citizenship Number</p>
                <input
                  className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                  type="text"
                  placeholder="Enter your Citizenship Number"
                  required
                />
              </div>
              <div className="mt-2">
                <p>National Identity Number</p>
                <input
                  className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                  type="text"
                  placeholder="Enter your National Identity Number"
                  required
                />
              </div>
            </div>
            <div className="mt-2">
              <p>Phone Number</p>
              <input
                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                type="text"
                placeholder="Enter Your Phone Number"
                required
              />
            </div>
            <div className="mt-2">
              <p>Full Address</p>
              <input
                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                type="text"
                placeholder="Enter Your full Address"
                required
              />
            </div>
            <div className="mt-2">
              <p>Gender</p>
              <input
                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                type="text"
                placeholder="Enter Your Gender"
                required
              />
            </div>
            <div className="mt-2">
              <p>Bio</p>
              <textarea
                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                placeholder="Enter Your Bio"
                required
              >
              </textarea>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <p>Upload The Photo of Citizenship</p>
              <div className="flex ">
                <div className="w-96 object-contain flex flex-col justify-center items-center">
                  <Image
                    src="/assets/img/placeholder.png"
                    alt="Selected"
                    layout="responsive"
                    width={300}
                    height={200}
                    className=" flex p-1  rounded-2xl  justify-center items-center"
                  />
                  <span className="">Front side of Citizenship</span>
                </div>
                <div className="w-96 object-contain flex flex-col justify-center items-center">
                  <Image
                    src="/assets/img/placeholder.png"
                    alt="Selected"
                    layout="responsive"
                    width={300}
                    height={200}
                    className=" flex p-1  rounded-2xl  justify-center items-center"
                  />
                  <span className="">Back side of Citizenship</span>
                </div>
              </div>
            </div>

            <div className="flex w-full py-3">
              <button type='submit' className="w-48 bg-blue-600 text-white p-2 rounded-lg mb-2 mt-2 hover:bg-blue-400 ">
                Update
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}