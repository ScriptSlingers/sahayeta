'use client'
import { ProfileIcon } from '@sahayeta/icons'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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
}

export default function SingleCampaign({ params }: { params: { id: string } }) {
  const campaignId = params.id
  const [campaign, setCampaign] = useState<CampaignData | null>(null)

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const res = await axios.get(`/api/campaigns/${campaignId}`)
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
          <div className="relative flex h-96 ">
            <Link href="/">
              <Image
                src={campaign?.image}
                alt={campaign?.title}
                fill
                className="rounded-xl object-cover"
              />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border border-accent p-3">
              <Link href="#">
                <ProfileIcon />
              </Link>
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
              <button className="mb-6 w-full rounded-lg bg-[#fdb72f] p-2 text-black hover:bg-orange-300 ">
                Make a donation
              </button>
            </div>
          </div>
          <div className="border-b border-slate-500"></div>
          <div className="flex flex-col gap-2">
            <div className="flex  gap-7">
              <Link href="/profile">
                <div className="relative overflow-hidden rounded-full hover:cursor-pointer">
                  <Image
                    src={campaign?.createdBy?.profileImage}
                    alt={campaign?.createdBy?.name}
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
                <div className="text-slate-800 ">
                  {' '}
                  End Date: {campaign?.endDate}
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-slate-500"></div>
        </div>
        <div className=" relative m-7 mt-12 flex h-fit flex-col rounded-2xl bg-white shadow-2xl md:flex-row md:space-y-0 lg:w-1/3 ">
          <section className="m-2 flex flex-col p-8 md:p-10">
            <div className="mb-5 text-slate-800">
              {' '}
              Npr. {campaign?.goalAmount} goal
            </div>

            <button className="mb-2 mt-2 w-full rounded-lg border bg-gradient-to-t from-orange-400 to-yellow-300 p-2 text-black hover:border-2">
              Share{' '}
            </button>
            <button className="mb-2 mt-2 w-full rounded-lg border bg-gradient-to-b from-orange-400 to-yellow-400 p-2 text-black hover:border-2">
              Donate now{' '}
            </button>
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
                We gurantee you a full refund for up to a year in the rare case
                that fraud occurs.{' '}
                <a href="#" className="underline hover:text-blue-500">
                  {' '}
                  See our Sahayata Giving Gurantee.
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
