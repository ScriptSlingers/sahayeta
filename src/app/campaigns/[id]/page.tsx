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

interface Payment {
  paymentAmount: number
  paymentBy: {
    name: string
  }
}

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
  payments: Payment[]
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
      <div className="container flex gap-7 ">
        <div className="flex flex-col gap-6 p-10 sm:w-full lg:w-2/3 ">
          <div className="font-maven text-xl font-semibold">
            {campaign?.title}
          </div>
          <div className="relative flex h-96 w-full ">
            <Image
              src={campaign?.image || "/assets/img/placeholder.png"}
              alt={campaign?.title || ""}
              fill
              quality={100}
              className="rounded-xl object-cover"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border border-accent p-3">
              <ProfileIcon />
            </div>
            <div className="rounded-md p-2">
              {campaign?.createdBy?.name
                ? `${campaign.createdBy.name} is organizing this fundraiser.`
                : 'Organizer name not available.'}
            </div>
          </div>
          <div className="border-b border-slate-500"></div>
          <div>Hello my name is {campaign?.createdBy?.name},</div>
          <div className="text-justify">{campaign?.description}</div>
          
          <div className="w-full  items-center justify-center gap-3 rounded  bg-white p-3 shadow lg:flex ">
            <div>
              <div className="relative flex h-20 w-20 ">
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
              <div className="font-maven text-lg font-semibold">
                `Give Rs.500 and be a founding donor`
              </div>
              <div className="text-slate-600">
                Your donation is the start of {campaign?.createdBy?.name}{' '}
                journey to success. Your early support inspires others to
                donate.
              </div>
              <Link href={`/pay?campaignid=${campaignId}`} className="mb-6 w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-400 text-center">
              Make a Donation
            </Link>
            </div>
          </div>
          
          <div className="border-b border-slate-500"></div>
          
          <div className="flex flex-col gap-2">
            <div className="flex  gap-7">
              <Link href="/profile">
                <div className="relative overflow-hidden rounded-full hover:cursor-pointer">
                  <Image
                    src={campaign?.createdBy?.profileImage || "/assets/img/avatar.jpg"}
                    alt={campaign?.createdBy?.name || ""}
                    height={40}
                    width={50}
                  />
                </div>
              </Link>
              <div className=" flex flex-col gap-2 rounded-md ">
                <div className=" font-maven text-lg font-semibold ">
                  {campaign?.createdBy?.name}
                </div>
                <div className="text-slate-800">Organizer</div>
                <div className="text-slate-800 ">
                  {' '}
                  Address: {campaign?.createdBy?.address || ''}
                </div>
                <div className="text-slate-800 ">
                  Contact: {campaign?.createdBy?.phoneNum || ''}
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-slate-500"></div>
          <div className="flex flex-col gap-2">
            <div className="flex  gap-7">
              <div className=" w-full">
                {campaign &&
                  <OsmMap latitude={campaign?.latitude} longitude={campaign?.longitude}
                    address={campaign?.address} />
                }
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col  lg:w-1/3 md:space-y-10 m-7'>
        <div className=" relative mt-12 flex h-fit flex-col rounded-2xl bg-white shadow-xl md:flex-col border-1">
             <section className="m-2 flex flex-col p-8 md:p-10  ">
            <div className="mb-5 text-slate-800">
              {' '}
              Npr. {campaign?.goalAmount} goal
            </div>
            <button className="mb-2 mt-2 w-full rounded-lg border bg-blue-500 p-2 text-white hover:border-2 text-center font-semibold hover:bg-blue-400">
              Share{' '}
            </button>
            <Link href={`/pay?campaignid=${campaignId}`} className="mb-2 mt-2 w-full rounded-lg border bg-blue-500 p-2 text-white hover:border-2 text-center font-semibold hover:bg-blue-400">
              Donate now
            </Link>
            <div className="mb-2 mt-2 flex items-center gap-3">
              <Link href="/profile">
                <div className="relative overflow-hidden rounded-full hover:cursor-pointer">
                  <Image
                    src="/assets/img/help.png"
                    alt="help icon"
                    height={40}
                    width={50}
                  />
                </div>
              </Link>
              <div className=" rounded-md p-2">
                <p className="font-medium">Become the first supporter</p>
                <p className="mt-1 font-maven text-sm text-slate-500">
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
                <a href="#" className="underline hover:text-blue-500">
                  {' '}
                  See our Sahayata Giving Guarantee.
                </a>
              </div>
            </div>
             </section>
            
        </div>
        
        <div className='flex rounded-2xl bg-white shadow-xl border-1'>
          <section className="m-2 flex flex-col p-8 md:p-10">
            <h1 className=' font-bold gap-12'>Donations</h1>
              {campaign?.payments.map((payment) => (
              <div className="flex mt-2">
                <div className="relative overflow-hidden rounded-full ">
                  <Image
                    src="/assets/img/confetti.png"
                    alt="confetti"
                    height={30}
                    width={30}
                  />
                </div>
              <h1 className="mb-2 font-medium">
                {payment.paymentBy.name} donated NPR. {payment.paymentAmount}
              </h1>
              </div>))}
          </section>
          </div>
      </div>
      </div>
    </>
  )
}
