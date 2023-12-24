'use client'
import { FrontCard } from '@sahayeta/components'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {
  const [campaign, setCampaign] = useState<any>()
  const session = useSession()

  useEffect(() => {
    fetch(`/api/campaigns/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`)
        }
        return res.json()
      })
      .then(data => {
        setCampaign(data)
      })
      .catch(error => {
        console.error('Fetch error:', error)
      })
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-3 py-20 px-5">
        <div className="flex flex-col items-center gap-4">
          <span className="text-6xl font-semibold">campaingns</span>
          <span className="text-2xl font-normal">
            Articles to make you healthier, happier and smarter.
          </span>
          <span className="text-base font-normal text-blue-700">
            <Link href='/create-campaign'>
              Click here to create campaign
            </Link>
          </span>
          <div className="h-[1px] bg-black w-[95%]"></div>

          <div className=" w-3/5 h-[600px] relative rounded-xl bg-white p-3 flex gap-2 flex-col justify-center items-center">
            <Image
              src="/assets/img/health.avif"
              alt="My Image"
              fill
              className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col gap-3 w-3/5 items-start">
            <span className="text-xl font-poppins font-semibold text-[#2540C4]">
              This is Title of campaign
            </span>
            <span className="text-base font-poppins text-black">
              This is detail of campaign
            </span>
            <span className="text-base font-poppins font-normal text-gray-500">
              {' '}
              Date
            </span>
          </div>
        </div>
      </div>
      <div className="container text-black p-3 gap-3 grid grid-cols-3 justify-center items-center">
        {campaign?.campaigns.map(
          ({
            campaignId,
            image,
            title,
            description,
            currentAmount,
            collectedAmount
          }: any) => {
            return (
              <FrontCard
                key={campaignId}
                campaignId={campaignId}
                campaignImageURL={image}
                campaignTitle={title}
                campaignDescription={description}
                campaignCurrentAmount={currentAmount}
                campaignCollectedAmount={collectedAmount}
              />
            )
          }
        )}
      </div>

    </div>
  )
}
