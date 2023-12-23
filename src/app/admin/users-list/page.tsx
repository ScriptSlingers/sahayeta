'use client'
import { useClientSession } from '@sahayeta/app/utils/useClientSession'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function Users() {
    const router = useRouter()

    const [users, setUsers] = useState({ users: [] })
    const currentUser = useClientSession()

    if (currentUser && currentUser?.role !== 'admin') {
        router.push('/login')
    }

    useEffect(() => {
        axios
            .get('/api/users/', {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => {
                setUsers(response.data)
            })
            .catch(error => {
                console.error('Axios error:', error)
            })
    }, [])

    return (
        <div className="bg-blue-50 rounded w-full  flex flex-col p-6 justify-center items-center">
            <div className="container ">
                <div className="bg-slate-200 flex flex-col w-full py-5 rounded-xl  ">
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
                                            fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"
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
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
                                    ({ id, username, name, email, phoneNum, role }: any) => {
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
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                                >
                                                    {username}
                                                </th>
                                                <td className="px-6 py-4">{name}</td>
                                                <td className="px-6 py-4">{email}</td>

                                                <td className="px-6 py-4">{phoneNum}</td>
                                                <td className="px-6 py-4">{role}</td>
                                                <td className="px-6 py-4">Balance</td>
                                                <td className="px-6 py-4">
                                                    <a
                                                        href="#"
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        <BsThreeDotsVertical />
                                                    </a>
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