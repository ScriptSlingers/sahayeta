'use client'
import FrontCard from '@sahayeta/components/FrontCard'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
export default function Page() {
  const [campaign, setCampaign] = useState<any>()

  useEffect(() => {
    fetch(`/api/campaigns/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        const campaign = data
        setCampaign(campaign)
      })
  }, [campaign])
  console.log(campaign)

  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-center items-center bg-indigo-100 text-black gap-6">
        <div className="w-full md:w-2/5 flex flex-col p-4 md:p-10 gap-4 md:gap-6">
          <div className="text-3xl md:text-5xl font-serif font-extralight">
            Donation can change the world
          </div>
          <p className="text-xl md:text-2xl font-semibold text-blue-500">
            Donation is a way of love
          </p>
          <p className="text-base md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex">
            <Link
              href="#"
              className="items-center text-white bg-blue-600 rounded-3xl py-2 px-4 md:px-6 font-medium inline-block mr-4 hover:bg-transparent hover:border-purple-400 hover:text-black duration-300 hover:border border border-transparent"
            >
              Donate now
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative">
            <Image
              src="/assets/img/herosection.png"
              objectPosition="center"
              alt="Hero Section"
              width={500}
              height={300}
              className=""
              quality={100}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-8 ">
        <div className="">
          {campaign?.Campaigns.map((campaign: any) => {
            return (
              <FrontCard
                key={campaign?.campaignId}
                campaignId={campaign?.campaignId}
                campaignImageURL={campaign?.campaignImageURL}
                campaignTitle={campaign?.title}
                campaignDescription={campaign?.description}
                campaignCurrentAmount={campaign?.currentAmount}
                campaignCollectedAmount={campaign?.collectedAmount}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
