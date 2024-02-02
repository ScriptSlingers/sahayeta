'use client'
import { Dialog, Transition } from '@headlessui/react'
import { OpenLinkIcon, SearchIcon } from '@sahayeta/icons'
import { useClientSession } from '@sahayeta/utils/useClientSession'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  BsEye,
  BsPencil,
  BsPencilFill,
  BsThreeDotsVertical,
  BsTrash
} from 'react-icons/bs'

export default function CampaignsListing() {
  const router = useRouter()

  const [campaigns, setCampaigns] = useState<any>()
  const currentUser = useClientSession()

  useEffect(() => {
    if (currentUser && currentUser?.role !== 'admin') {
      router.push('/login')
    }
  }, [currentUser, router])

  useEffect(() => {
    axios
      .get('/api/campaigns/', {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        setCampaigns(response.data)
      })
      .catch(error => {
        console.error('Axios error:', error)
      })
  }, [campaigns])

  const customStatus = status => {
    switch (status) {
      case 'approved':
        return 'Approved'
      case 'pendingApproval':
        return 'Pending Approval'
      case 'rejected':
        return 'Rejected'
      case 'completed':
        return 'Completed'
      case 'cancelled':
        return 'Cancelled'
      case 'inProgress':
        return 'In Progress'
      default:
        return 'Pending Approval'
    }
  }

  function formatDate(endDate) {
    const date = new Date(endDate)
    const formattedDate = date.toLocaleDateString() // This gets the date part

    return formattedDate
  }

  return (
    <div className="flex w-full flex-col  items-center justify-center rounded bg-blue-50 p-6">
      <div className="container ">
        <div className="flex w-full min-w-[1366px] flex-col rounded-xl bg-slate-200 py-5  ">
          <div className="relative px-10 sm:rounded-lg">
            <p className="py-4 text-lg font-bold text-blue-700">
              Campaigns List
            </p>
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
                  <th scope="col" className="p-4"></th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created By
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Goal Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Coll. Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns?.campaigns?.map(
                  ({
                    campaignId,
                    title,
                    status,
                    description,
                    goalAmount,
                    category,
                    createdBy,
                    collectedAmount,
                    startDate,
                    endDate
                  }: any) => {
                    return (
                      <tr
                        className=" border-b hover:bg-gray-50 "
                        key={campaignId}
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-search-1"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                            />
                            <label className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                        >
                          <Link
                            href={`/campaigns/${campaignId}`}
                            className="flex items-center gap-2 text-blue-700"
                          >
                            {`${title.slice(0, 13)}${
                              title.length > 13 ? '...' : ''
                            }`}
                            <div className="h-4 w-4">
                              <OpenLinkIcon />
                            </div>
                          </Link>
                        </th>
                        <td className="px-6 py-4">{category?.name}</td>
                        <td className="px-6 py-4">{createdBy?.name}</td>
                        <td className="px-6 py-4">{formatDate(startDate)}</td>
                        <td className="px-6 py-4">{formatDate(endDate)}</td>
                        <td className="px-6 py-4">{goalAmount}</td>
                        <td className="px-6 py-4">{collectedAmount}</td>
                        <td className="px-6 py-4">{customStatus(status)}</td>
                        <td className="px-6 py-4">
                          <div className="relative z-10 flex items-center justify-center text-center">
                            <div className="flex gap-3">
                              <div className="text-base font-medium text-red-600">
                                <DeleteModal campaignId={campaignId} />
                              </div>
                              <div className="text-base font-medium text-blue-700">
                                <EditModal
                                  campaignId={campaignId}
                                  title={title}
                                  description={description}
                                  goalAmount={goalAmount}
                                />
                              </div>
                              <Link
                                href={`/campaigns/${campaignId}`}
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

export const DeleteModal = ({ campaignId }) => {
  const [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleDelete = async campaignId => {
    try {
      await axios.delete(`/api/campaigns/${campaignId}`)
      toast.success(`Campaign Deleted Successfully`)
      closeModal()
    } catch (error) {
      console.error('Error deleting Campaign:', error)
      toast.error(
        'Error Deleting Campaign: Activity associated with user exists.'
      )
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
                    Are you sure to Delete this Campaign?
                  </Dialog.Title>
                  <div className="mt-2 ">
                    <p className="text-center text-sm text-gray-500">
                      If you delete this Campaign it will be removed from your
                      system permanently, you cannot get it back.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-10 ">
                    <button
                      type="button"
                      onClick={() => handleDelete(campaignId)}
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

export const EditModal = ({ campaignId, title, description, goalAmount }) => {
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
      title: title,
      description: description,
      goalAmount: goalAmount
    }
  })

  const handleEdit = async values => {
    try {
      await axios.patch(
        `/api/campaigns/${campaignId}`,
        { ...values },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
          }
        }
      )
      toast.success(`Campaign Edited Successfully`)
      closeModal()
    } catch (error) {
      console.error('Error Editing Campaign:', error)
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white px-6 py-10 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Editing Campaign {title}
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit(handleEdit)}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-600 ">
                        Title
                      </label>
                      <input
                        {...register('title')}
                        className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                        type="text"
                        placeholder="Full Name"
                        defaultValue={title}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-600 ">
                        Description
                      </label>
                      <textarea
                        {...register('description')}
                        className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                        rows={10}
                        placeholder="Full Name"
                        defaultValue={description}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-600 ">
                        Goal Amount
                      </label>
                      <input
                        {...register('goalAmount')}
                        className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                        type="number"
                        placeholder="Email"
                        defaultValue={goalAmount}
                      />
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
