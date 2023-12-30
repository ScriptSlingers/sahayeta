'use client'
import { ProfileIcon } from '@sahayeta/icons'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



interface CampaignData {
    id: string;
    title: string;
    description: string;
    image: string;
    createdBy: {
        name: string;
        profileImage: string;
        address?: string;
        phoneNum?: string;
    };
    endDate: string;
    goalAmount: string;
}

export default function SingleCampaign({ params }: { params: { id: string } }) {
    const campaignId = params.id
    const userId = params.id
    const [campaign, setCampaign] = useState<CampaignData | null>(null);

    useEffect(() => {
        const fetchCampaignData = async () => {
            try {
                const res = await axios.get(
                    `/api/campaigns/${campaignId}`
                )
                setCampaign(res.data)
            } catch (error) {
                return error
            }
        }
        fetchCampaignData()
    }, [])

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            console.log(`Deleted user  ${userId}`);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className="container flex gap-7 ">
                <div className="lg:w-2/3 sm:w-full flex flex-col p-10 gap-6 ">
                    <div className="text-xl font-maven font-semibold">
                        {campaign?.title}
                    </div>
                    <div className="relative flex h-96 ">
                        <Link href="/">
                            <Image
                                src={campaign?.image}
                                alt={campaign?.title}
                                fill
                                className="object-cover rounded-xl"
                            />
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 border border-accent p-3 rounded-full">
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
                    <div className="lg:flex  gap-3 items-center justify-center bg-white  shadow rounded w-full p-3 ">
                        <div>
                            <div className="relative flex w-20 h-20 ">
                                <Link href="/">
                                    <Image
                                        src="/assets/img/donateicon.png"
                                        alt="logo"
                                        fill
                                        className="object-cover rounded-full"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-semibold font-maven text-lg">
                                `Give Rs.500 and be a founding donor`
                            </div>
                            <div className="text-slate-600">
                                Your donation is the start of {campaign?.createdBy?.name}{' '}
                                journey to success. Your early support inspires others to
                                donate.
                            </div>
                            <button className="w-full bg-[#fdb72f] text-black p-2 rounded-lg mb-6 hover:bg-orange-300 ">
                                Make a donation
                            </button>
                        </div>
                    </div>
                    <div className="border-b border-slate-500"></div>
                    <div className="flex flex-col gap-2">
                        <div className="flex  gap-7">
                            <Link href="/profile">
                                <div className="relative rounded-full overflow-hidden hover:cursor-pointer">
                                    <Image
                                        src={campaign?.createdBy?.profileImage}
                                        alt={campaign?.createdBy?.name}
                                        height={40}
                                        width={50}
                                    />
                                </div>
                            </Link>
                            <div className=" rounded-md flex flex-col gap-2 ">
                                <div className=" font-semibold font-maven text-lg ">
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
                <div className=" lg:w-1/3 h-fit relative flex flex-col m-7 mt-12 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
                    <section className="flex flex-col p-8 m-2 md:p-10">
                        <div className="text-slate-800 mb-5">
                            {' '}
                            Npr. {campaign?.goalAmount} goal
                        </div>

                        <button className="w-full bg-gradient-to-t from-orange-400 to-yellow-300 border text-black p-2 rounded-lg mb-2 mt-2 hover:border-2">
                            Share{' '}
                        </button>
                        <button className="w-full bg-gradient-to-b from-orange-400 to-yellow-400 border text-black p-2 rounded-lg mb-2 mt-2 hover:border-2">
                            Donate now{' '}
                        </button>
                        <div className="flex items-center gap-3 mt-2 mb-2">
                            <Link href="/profile">
                                <div className="relative rounded-full overflow-hidden hover:cursor-pointer">
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
                                <p className="text-slate-500 font-maven text-sm mt-1">
                                    Your Donation matters
                                </p>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h1 className="font-medium mb-2">
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
