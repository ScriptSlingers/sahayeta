'use client'
import { OpenLinkIcon } from '@sahayeta/icons'
import { useClientSession } from '@sahayeta/utils'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<any>()
  const [createdByInfo, setCreatedByInfo] = useState<any>()
  const currentUser = useClientSession()

  useEffect(() => {
    if (currentUser) {
      axios
        .get('/api/campaigns/', {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
          const userCampaigns = response.data.campaigns.filter(
            (campaign: any) =>
              campaign.createdById === currentUser?.id
          )
          setCampaigns(userCampaigns)
        })
        .catch(error => {
          console.error('Axios error:', error)
        })
    }
  }, [currentUser])

  let count = 1

  return (
    <div className="flex w-full flex-col  items-center justify-center rounded bg-blue-50">
      <div className="container ">
        <div className="flex w-full min-w-[1366px] flex-col rounded-xl bg-slate-200 py-5  ">
          <div className="relative px-10 sm:rounded-lg">
            <p className="py-4 text-lg font-bold text-blue-700">
              Campaigns List
            </p>
          </div>
          <div className="m-3">
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
            <table className="mt-2 w-full text-left text-sm text-gray-500 rtl:text-right ">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.N.
                  </th>
                  <th scope="col">Title</th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Goal Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Collected Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns?.map(
                  ({
                    campaignId,
                    title,
                    goalAmount,
                    category,
                    collectedAmount,
                    startDate,
                    endDate,
                    status
                  }: any) => (
                    <tr
                      key={campaignId}
                      className=" border-b hover:bg-gray-50 "
                    >
                      <td className="px-6 py-4">{count++}</td>
                      <td scope="row" className="font-medium text-gray-900 ">
                        <Link
                          href={`/campaigns/${campaignId}`}
                          className="flex items-center gap-2 text-blue-700"
                        >
                          {`${title.slice(0, 20)}${title.length > 20 ? '...' : ''
                            }`}
                          <div className="h-4 w-4">
                            <OpenLinkIcon />
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">{category?.name}</td>
                      <td className="px-6 py-4">
                        {startDate || 'Not specified'}
                      </td>
                      <td className="px-6 py-4">
                        {goalAmount || 'Not specified'}
                      </td>
                      <td className="px-6 py-4">
                        {collectedAmount || 'Not specified'}
                      </td>
                      <td className="px-6 py-4">
                        {endDate || 'Not specified'}
                      </td>
                      <td className="px-6 py-4">{status}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
