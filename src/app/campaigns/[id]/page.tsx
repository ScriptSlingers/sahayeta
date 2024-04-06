'use client'
import { ProfileIcon } from '@sahayeta/icons'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const OsmMap = dynamic(() => import('@sahayeta/components/MapComponent'), {
  ssr: false
})

interface CampaignData {
  id: string
  title: string
  description: string
  image: string
  createdBy: {
    name: string
    profileImage: string
    address?: string
    phoneNum?: string
  }
  endDate: string
  goalAmount: string
  longitude: string
  latitude: string
  address: string
}

export default function SingleCampaign({ params }: { params: { id: string } }) {
  const campaignId = params.id
  const [campaign, setCampaign] = useState<CampaignData | null>(null)

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const res = await axios.get(`/api/campaigns/${campaignId}`)
        console.log(res.data);
        setCampaign(res.data)
      } catch (error) {
        return error
      }
    }
    fetchCampaignData()
  }, [])

  return (
    <>
      <div className="flex gap-7 container">
        <div className="flex flex-col gap-6 p-10 sm:w-full lg:w-2/3">
          <div className="font-maven font-semibold text-xl">
            {campaign?.title}
          </div>
          <div className="relative flex w-full h-96">
            <Image
              src={campaign?.image || "/assets/img/placeholder.png"}
              alt={campaign?.title || ""}
              fill
              quality={100}
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="border-accent p-3 border rounded-full w-12 h-12">
              <ProfileIcon />
            </div>
            <div className="p-2 rounded-md">
              {campaign?.createdBy?.name
                ? `${campaign.createdBy.name} is organizing this fundraiser.`
                : 'Organizer name not available.'}
            </div>
          </div>
          <div className="border-slate-500 border-b"></div>
          <div>Hello my name is {campaign?.createdBy?.name},</div>
          <div className="text-justify">{campaign?.description}</div>

          <div className="lg:flex justify-center items-center gap-3 bg-white shadow p-3 rounded w-full">
            <div>
              <div className="relative flex w-20 h-20">
                <Link href="/">
                  <Image
                    src="/assets/img/donateicon.png"
                    alt="logo"
                    fill
                    className="rounded-full object-cover"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-maven font-semibold text-lg">
                `Give Rs.500 and be a founding donor`
              </div>
              <div className="text-slate-600">
                Your donation is the start of {campaign?.createdBy?.name}{' '}
                journey to success. Your early support inspires others to
                donate.
              </div>
              <button className="bg-blue-500 hover:bg-blue-400 mb-6 p-2 rounded-lg w-full text-white">
                Make a donation
              </button>
            </div>
          </div>

          <div className="border-slate-500 border-b"></div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-7">
              <Link href="/profile">
                <div className="relative rounded-full hover:cursor-pointer overflow-hidden">
                  <Image
                    src={campaign?.createdBy?.profileImage || "/assets/img/avatar.jpg"}
                    alt={campaign?.createdBy?.name || ""}
                    height={40}
                    width={50}
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-2 rounded-md">
                <div className="font-maven font-semibold text-lg">
                  {campaign?.createdBy?.name}
                </div>
                <div className="text-slate-800">Organizer</div>
                <div className="text-slate-800">
                  {' '}
                  Address: {campaign?.createdBy?.address || ''}
                </div>
                <div className="text-slate-800">
                  Contact: {campaign?.createdBy?.phoneNum || ''}
                </div>
              </div>
            </div>
          </div>
          <div className="border-slate-500 border-b"></div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-7">
              <div className="w-full">
                {campaign &&
                  <OsmMap latitude={campaign?.latitude} longitude={campaign?.longitude}
                    address={campaign?.address} />
                }
              </div>
            </div>

          </div>
          <div className="border-slate-500 border-b"></div>
          <div className='font-medium'>
            Donners Comment
          </div>
          <p>Get Well Soon</p>
        </div>
        <div className='flex flex-col md:space-y-10 m-7 lg:w-1/3'>
          <div className="relative flex flex-col md:flex-col border-1 bg-white shadow-xl mt-12 rounded-2xl h-fit">
            <section className="flex flex-col m-2 p-8 md:p-10">
              <div className="mb-5 text-slate-800">
                {' '}
                Npr. {campaign?.goalAmount} goal
              </div>
              <button className="hover:border-2 bg-blue-500 hover:bg-blue-400 mt-2 mb-2 p-2 border rounded-lg w-full font-semibold text-center text-white">
                Share{' '}
              </button>
              <Link href={`/pay?campaignid=${campaignId}`} className="hover:border-2 bg-blue-500 hover:bg-blue-400 mt-2 mb-2 p-2 border rounded-lg w-full font-semibold text-center text-white">
                Donate now
              </Link>
              <div className="flex items-center gap-3 mt-2 mb-2">
                <Link href="/profile">
                  <div className="relative rounded-full hover:cursor-pointer overflow-hidden">
                    <Image
                      src="/assets/img/help.png"
                      alt="help icon"
                      height={40}
                      width={50}
                    />
                  </div>
                </Link>
                <div className="p-2 rounded-md">
                  <p className="font-medium">Become the first supporter</p>
                  <p className="mt-1 font-maven text-slate-500 text-sm">
                    Your Donation matters
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <h1 className="mb-2 font-medium">
                  Sahayata protects your donation
                </h1>
                <div>
                  We guarantee you a full refund for up to a year in the rare case
                  that fraud occurs.{' '}
                  <a href="#" className="hover:text-blue-500 underline">
                    {' '}
                    See our Sahayata Giving Guarantee.
                  </a>
                </div>
              </div>
            </section>

          </div>

          <div className='flex border-1 bg-white shadow-xl rounded-2xl'>
            <section className="flex flex-col p-8 md:p-10">


              <div className="flex justify-center items-center">
                <div className="relative rounded-full overflow-hidden">
                  <Image
                    src="/assets/img/confetti.png"
                    alt="confetti"
                    height={30}
                    width={30}
                  />
                </div>
                <h1 className="mb-2 font-medium">
                  Reshma Pariyar donated  RS.2,000.
                </h1>
              </div>
            </section>
          </div>

        </div>
      </div>
    </>
  )
}
