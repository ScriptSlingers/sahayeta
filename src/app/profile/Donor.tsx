'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image';
import { useClientSession } from '@sahayeta/utils';
import { TbAddressBook, } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";



export default function Donor() {
    const [campaigns, setCampaigns] = useState<any>();
    const [createdByInfo, setCreatedByInfo] = useState<any>();
    const currentUser = useClientSession();


    useEffect(() => {
        if (currentUser) {
            axios
                .get('/api/campaigns/', {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(response => {
                    const userCampaigns = response.data.campaigns.filter(
                        (campaign: any) => campaign.createdBy && campaign.createdBy.id === currentUser.id
                    );
                    setCampaigns(userCampaigns);

                    // Assuming createdBy is the same for all campaigns, fetch it once 
                    const firstCampaignCreatedBy = userCampaigns.length > 0 ? userCampaigns[0].createdBy : null;
                    setCreatedByInfo(firstCampaignCreatedBy);
                })
                .catch(error => {
                    console.error('Axios error:', error);
                });
        }
    }, [currentUser]);



    return (

        <div className="bg-blue-50 rounded w-full  flex flex-col p-6 justify-center items-center">
            <div className="container flex items-center justify-center ">
                <div className="bg-slate-200 flex flex-col w-full py-5 rounded-xl  ">
                    <div className="relative px-10 sm:rounded-lg">
                        <p className="text-lg font-bold py-4 text-blue-700">User Information</p>
                    </div>
                    <div className='m-3'>
                        {createdByInfo && (
                            <div className="  flex items-center gap-3 rounded-md bg-gray-50 border mb-3 ">
                                <div className="relative w-24 h-24 border border-accent m-3 bg-slate-300 rounded-full">
                                    <Image
                                        src={createdByInfo?.profileImage || ""}
                                        alt="Profile image"
                                        fill
                                        className="rounded-full"

                                    />
                                </div>
                                <div className=" rounded-md p-2">
                                    <p className='font-medium text-xl'>{createdByInfo?.name}</p>
                                    <p className='text-slate-500 font-maven text-md  flex '><TbAddressBook className='m-1' />{createdByInfo?.address}</p>
                                    <p className='text-slate-500 font-maven text-md  flex '><FaHeart className='m-1' />{createdByInfo?.role}</p>
                                </div>
                            </div>
                        )}
                        <div className='w-full'>
                            <div className='p-4'>
                                <h6 className='font-semibold text-lg flex'><FaCalendarAlt className='m-2 text-lg' />Donation Information</h6>
                            </div>
                        </div>
                        {campaigns && campaigns.length > 0 && (
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-2">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category

                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Amount
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
                                            balance,
                                            category,

                                        }: any) => (
                                            <tr key={campaignId} className=" border-b hover:bg-gray-50 ">
                                                <td className="px-6 py-4">{title}</td>
                                                <td className="px-6 py-4">{category?.name}</td>
                                                <td className="px-6 py-4">{balance}</td>
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