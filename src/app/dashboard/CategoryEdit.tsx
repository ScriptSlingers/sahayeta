'use client'

import { Dialog, Transition } from '@headlessui/react'
import { OpenLinkIcon } from '@sahayeta/icons'
import { useClientSession } from '@sahayeta/utils'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs'

export default function CategoryEdit() {
  const router = useRouter()

  const [category, setCategory] = useState<any>()
  const currentUser = useClientSession()

  useEffect(() => {
    if (currentUser && currentUser?.role !== 'admin') {
      router.push('/login')
    }
  }, [currentUser, router])

  useEffect(() => {
    axios
      .get('/api/category/', {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        setCategory(response.data)
      })
      .catch(error => {
        console.error('Axios error:', error)
      })
  }, [category])

  let count = 1

  return (
    <div className="flex w-full flex-col  items-center justify-center rounded bg-blue-50">
      <div className="container ">
        <div className="flex w-full min-w-[1366px] flex-col rounded-xl bg-slate-200 py-5  ">
          <div className="relative px-10 sm:rounded-lg">
            <p className="py-4 text-lg font-bold text-blue-700">
              Category List
            </p>
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
                <tr>
                  <th scope="col" className="p-4">
                    S.N.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Display Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {category?.category?.map(
                  ({ id, name, displayName, description, index }: any) => {
                    return (
                      <tr className=" border-b hover:bg-gray-50 " key={id}>
                        <td className="w-4 p-4">{count++}</td>
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                        >
                          <Link
                            href={`/category/${id}`}
                            className="flex items-center gap-2 text-blue-700"
                          >
                            {name}
                            <div className="h-4 w-4">
                              <OpenLinkIcon />
                            </div>
                          </Link>
                        </th>
                        <td className="px-6 py-4">{displayName}</td>
                        <td className="px-6 py-4">{description}</td>
                        <td className="px-6 py-4">
                          <div className="relative z-10 flex items-center justify-center text-center">
                            <div className="flex gap-3">
                              <div className="text-base font-medium text-red-600">
                                <DeleteModal id={id} />
                              </div>
                              <div className="text-base font-medium text-blue-700">
                                <EditModal
                                  id={id}
                                  name={name}
                                  displayName={displayName}
                                  description={description}
                                />
                              </div>
                              <Link
                                href={`/ category / ${id}`}
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

export const EditModal = ({ id, name, displayName, description }: any) => {
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
      name: name,
      displayName: displayName,
      description: description
    }
  })

  const handleEdit = async values => {
    try {
      await axios.patch(
        `/api/category/${id}`,
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
                    Editing Category {name}
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit(handleEdit)}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-600 ">
                        Category Name
                      </label>
                      <input
                        {...register('name')}
                        className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                        type="text"
                        placeholder="Name"
                        defaultValue={name}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-600 ">
                        Category Display Name
                      </label>
                      <input
                        {...register('displayName')}
                        className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                        type="text"
                        placeholder="Display Name"
                        defaultValue={displayName}
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
                        placeholder="Description"
                        defaultValue={description}
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

export const DeleteModal = ({ id }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/category/${id}`)
      toast.success(`Category Deleted Successfully`)
      closeModal()
    } catch (error) {
      console.error('Error deleting Category:', error)
      toast.error(
        'Error Deleting Category: Activity associated with category exists.'
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
