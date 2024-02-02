'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useClientSession } from '@sahayeta/utils'
import { TbAddressBook } from 'react-icons/tb'
import { FaHeart } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'

export default function Fundraiser() {
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
              campaign.createdBy && campaign.createdBy.id === currentUser.id
          )
          setCampaigns(userCampaigns)

          // Assuming createdBy is the same for all campaigns, fetch it once
          const firstCampaignCreatedBy =
            userCampaigns.length > 0 ? userCampaigns[0].createdBy : null
          setCreatedByInfo(firstCampaignCreatedBy)
        })
        .catch(error => {
          console.error('Axios error:', error)
        })
    }
  }, [currentUser])

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
            {createdByInfo && (
              <div className="  mb-3 flex items-center gap-3 rounded-md border bg-gray-50 ">
                <div className="relative m-3 h-24 w-24 rounded-full border border-accent bg-slate-300">
                  <Image
                    src={createdByInfo?.profileImage || ''}
                    alt="Profile image"
                    fill
                    className="rounded-full"
                  />
                </div>
                <div className=" rounded-md p-2">
                  <p className="text-xl font-medium">{createdByInfo?.name}</p>
                  <p className="text-md flex font-maven  text-slate-500 ">
                    <TbAddressBook className="m-1" />
                    {createdByInfo?.address}
                  </p>
                  <p className="text-md flex font-maven  text-slate-500 ">
                    <FaHeart className="m-1" />
                    {createdByInfo?.role}
                  </p>
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="p-4">
                <h6 className="flex text-lg font-semibold">
                  <FaCalendarAlt className="m-2 text-lg" />
                  Donation Information
                </h6>
              </div>
            </div>
            {campaigns && campaigns.length > 0 && (
              <table className="mt-2 w-full text-left text-sm text-gray-500 rtl:text-right ">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
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
                      endDate
                    }: any) => (
                      <tr
                        key={campaignId}
                        className=" border-b hover:bg-gray-50 "
                      >
                        <td className="px-6 py-4">{title}</td>
                        <td className="px-6 py-4">{category?.name}</td>
                        <td className="px-6 py-4">{startDate}</td>
                        <td className="px-6 py-4">{goalAmount}</td>
                        <td className="px-6 py-4">{collectedAmount}</td>
                        <td className="px-6 py-4">{endDate}</td>
                        <td className="px-6 py-4">{status}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
