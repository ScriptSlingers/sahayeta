'use client'
import { Dialog, Transition } from '@headlessui/react'
import { useClientSession } from '@sahayeta/utils/useClientSession'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs'

export default function UsersListing() {
  const router = useRouter()
  const [users, setUsers] = useState({ users: [] })
  const currentUser = useClientSession()

  useEffect(() => {
    try {
      if (currentUser && currentUser?.role !== 'admin') {
        router.push('/login')
      }
    } catch (error) {
      console.error('Unexpected error during redirect:', error)
      toast.error('An unexpected error occurred. Please try again.')
    }
  }, [currentUser, router])

  useEffect(() => {
    try {
      axios
        .get('/api/users/', {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
          setUsers(response.data)
        })
        .catch(error => {
          console.error('Axios error:', error)
          toast.error('Error fetching users. Please try again.')
        })
    } catch (error) {
      console.error('Unexpected error:', error)
      toast.error('An unexpected error occurred. Please try again.')
    }
  }, [users])

  return (
    <div className="bg-blue-50 rounded w-full  flex flex-col p-6 justify-center items-center ">
      <div className="container">
        <div className="min-w-[1366px] flex flex-col w-full py-5 rounded-xl bg-slate-200 ">
          <div className="relative px-10 sm:rounded-lg">
            <p className="text-lg font-bold py-4 text-blue-700">Users List</p>
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
              <div>
                <button
                  id="dropdownRadioButton"
                  data-dropdown-toggle="dropdownRadio"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  font-medium rounded text-sm px-3 py-1.5"
                  type="button"
                >
                  <svg
                    className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                  </svg>
                  Last 30 days
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownRadio"
                  className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
                  data-popper-reference-hidden=""
                  data-popper-escaped=""
                  data-popper-placement="top"
                ></div>
              </div>
              <label className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block outline-none p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search for items"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 h-full">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="p-4"></th>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount Donated
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.users.map(
                  ({
                    id,
                    username,
                    name,
                    email,
                    phoneNum,
                    role,
                    address
                  }: any) => {
                    return (
                      <tr className=" border-b hover:bg-gray-50 " key={id}>
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-search-1"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <td scope="row" className="px-6 py-4">
                          {name}
                        </td>
                        <td className="px-6 py-4">{username}</td>
                        <td className="px-6 py-4">{email}</td>
                        <td className="px-6 py-4">{phoneNum}</td>
                        <td className="px-6 py-4">{role}</td>
                        <td className="px-6 py-4">Balance</td>
                        <td className="px-6 py-4">
                          <div className="relative text-center z-10 flex items-center justify-center">
                            <div className="flex gap-3">
                              <div className="font-medium text-red-600 text-base">
                                <DeleteModal id={id} />
                              </div>
                              <div className="font-medium text-blue-700 text-base">
                                <EditModal
                                  id={id}
                                  username={username}
                                  name={name}
                                  email={email}
                                  address={address}
                                  phoneNum={phoneNum}
                                  role={role}
                                />
                              </div>
                              <Link
                                href={`/dashboard/user/${id}`}
                                className="font-medium text-black text-base"
                              >
                                <BsEye />
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DeleteModal = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/users/${id}`)
      toast.success(`User Deleted Successfully`)
      closeModal()
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Error Deleting User: Activity associated with user exists.')
    }
  }

  return (
    <>
      <div className="">
        <button type="button" onClick={openModal} className="">
          <BsTrash />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Are you sure to Delete this Users?
                  </Dialog.Title>
                  <div className="mt-2 ">
                    <p className="text-sm text-gray-500 text-center">
                      If you delete this user it will be removed from your
                      system permanently, you cannot get it back.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-center items-center gap-10 ">
                    <button
                      type="button"
                      onClick={() => handleDelete(id)}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export const EditModal = ({
  id,
  username,
  name,
  email,
  address,
  phoneNum,
  role
}) => {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      username: username,
      name: name,
      email: email,
      phoneNum: phoneNum,
      address: address,
      role: role
    }
  })

  const handleEdit = async values => {
    try {
      await axios.patch(
        `/api/users/${id}`,
        { ...values },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      )
      toast.success(`User Edited Successfully`)
      closeModal()
    } catch (error) {
      console.error('Error Editing user:', error)
    }
  }

  return (
    <>
      <div>
        <button type="button" onClick={openModal} className="">
          <BsPencil />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white px-6 py-10 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Editing User {name}
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit(handleEdit)}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-600 text-sm font-bold ">
                        Username
                      </label>
                      <input
                        disabled
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Username"
                        value={username}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-600 text-sm font-bold ">
                        Name
                      </label>
                      <input
                        {...register('name')}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Full Name"
                        defaultValue={name}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-600 text-sm font-bold ">
                        Email
                      </label>
                      <input
                        {...register('email')}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder="Email"
                        defaultValue={email}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-600 text-sm font-bold ">
                        Phone
                      </label>
                      <input
                        {...register('phoneNum')}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Phone"
                        defaultValue={phoneNum}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-600 text-sm font-bold ">
                        Address
                      </label>
                      <input
                        {...register('address')}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Address"
                        defaultValue={address}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-gray-600 text-sm font-bold ">
                        Role
                      </label>
                      <select
                        {...register('role')}
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={role}
                      >
                        <option value="admin">Admin</option>
                        <option value="charity">Charity</option>
                        <option value="donor">Donor</option>
                        <option value="fundraiser">Fundraiser</option>
                      </select>
                    </div>

                    <div className="mt-4 flex justify-center items-center gap-10 ">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      >
                        {isSubmitting ? <>Updating...</> : <>Update</>}
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
