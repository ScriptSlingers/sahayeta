'use client'
import { useClientSession } from '@sahayeta/utils/useClientSession'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function NotificationListing() {
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
    }, [])

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

    return (
        <div className="bg-blue-50 rounded w-full  flex flex-col p-6 justify-center items-center">
            <div className="container ">
                <div className="bg-slate-200 flex flex-col w-full py-5 rounded-xl  ">
                    <div className="relative px-10 sm:rounded-lg">
                        <p className="text-lg font-bold py-4 text-blue-700">Notification</p>
                        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 gap-96">
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
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
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
                        <div className="flex items-center h-28 bg-white shadow rounded">
                            <div className='flex gap-2 justify-between items-center  px-10'>
                                <Image
                                    src="/assets/img/profile.jpg"
                                    width={200}
                                    height={200}
                                    alt="doc image"
                                    className="w-12 h-12 rounded-full"
                                />
                                <p>Anjali Poudel craeted a Campaign !!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
