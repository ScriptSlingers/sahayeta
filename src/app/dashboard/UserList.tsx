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

  let count = 1

  return (
    <div className="flex w-full flex-col items-center justify-center rounded bg-blue-50">
      <div className="container">
        <div className="flex w-full min-w-[1366px] flex-col rounded-xl bg-slate-200 py-5 ">
          <div className="relative px-10 sm:rounded-lg">
            <p className="py-4 text-lg font-bold text-blue-700">Users List</p>
            <div className="flex-column flex flex-wrap items-center justify-between space-y-4 pb-4 sm:flex-row sm:space-y-0">
              <div>
                <button
                  id="dropdownRadioButton"
                  data-dropdown-toggle="dropdownRadio"
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-3 py-1.5  text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none"
                  type="button"
                >
                  <svg
                    className="me-3 h-3 w-3 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                  </svg>
                  Last 30 days
                  <svg
                    className="ms-2.5 h-2.5 w-2.5"
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
                  className="z-10 hidden w-48 divide-y divide-gray-100 rounded-lg bg-white shadow"
                  data-popper-reference-hidden=""
                  data-popper-escaped=""
                  data-popper-placement="top"
                ></div>
              </div>
              <label className="sr-only">Search</label>
              <div className="relative">
                <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3 rtl:right-0">
                  <svg
                    className="h-5 w-5 text-gray-500"
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
                  className="block w-80 rounded border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Search for items"
                />
              </div>
            </div>
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
                <tr>
                  <th scope="col" className="p-4">
                    S.N.
                  </th>
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
                        <td className="w-4 p-4">{count++}</td>
                        <td scope="row" className="px-6 py-4">
                          {name}
                        </td>
                        <td className="px-6 py-4">{username}</td>
                        <td className="px-6 py-4">{email}</td>
                        <td className="px-6 py-4">{phoneNum}</td>
                        <td className="px-6 py-4">{role}</td>
                        <td className="px-6 py-4">Balance</td>
                        <td className="px-6 py-4">
                          <div className="relative z-10 flex items-center justify-center text-center">
                            <div className="flex gap-3">
                              <div className="text-base font-medium text-red-600">
                                <DeleteModal id={id} />
                              </div>
                              <div className="text-base font-medium text-blue-700">
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
                                className="text-base font-medium text-black"
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
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure to Delete this Users?
                  </Dialog.Title>
                  <div className="mt-2 ">
                    <p className="text-center text-sm text-gray-500">
                      If you delete this user it will be removed from your
                      system permanently, you cannot get it back.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-10 ">
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
      await axios.patch(`/api/users/${loggedInUser?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // or any other required headers
          // 'Authorization': `Bearer ${token}`, // if authorization is needed
        }
      })

      toast.success(`User Edited Successfully`)
      closeModal()
    } catch (error) {
      console.error('Error Editing user:', error)
      console.log(error.response) // Check the response from the server
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
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Editing User {name}
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit(handleEdit)}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-600 ">
                        Username
                      </label>
                      <input
                        disabled
                        className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                        type="text"
                        placeholder="Username"
                        value={username}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-600 ">
                        Name
                      </label>
                      <input
                        {...register('name')}
                        className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                        type="text"
                        placeholder="Full Name"
                        defaultValue={name}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-600 ">
                        Email
                      </label>
                      <input
                        {...register('email')}
                        className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                        type="email"
                        placeholder="Email"
                        defaultValue={email}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-600 ">
                        Phone
                      </label>
                      <input
                        {...register('phoneNum')}
                        className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                        type="text"
                        placeholder="Phone"
                        defaultValue={phoneNum}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-600 ">
                        Address
                      </label>
                      <input
                        {...register('address')}
                        className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                        type="text"
                        placeholder="Address"
                        defaultValue={address}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-600 ">
                        Role
                      </label>
                      <select
                        {...register('role')}
                        className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                        defaultValue={role}
                      >
                        <option value="admin">Admin</option>
                        <option value="charity">Charity</option>
                        <option value="donor">Donor</option>
                        <option value="fundraiser">Fundraiser</option>
                      </select>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-10 ">
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
