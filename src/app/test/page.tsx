"use client"
import { useClientSession } from '@sahayeta/utils';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';



const YourPage = () => {
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


                    const firstCampaignCreatedBy = userCampaigns.length > 0 ? userCampaigns[0].createdBy : null;
                    setCreatedByInfo(firstCampaignCreatedBy);
                })
                .catch(error => {
                    console.error('Axios error:', error);
                });
        }
    }, [currentUser]);

    return (
        <div>
            {createdByInfo && (
                <div className='bg-blue-500 p-4 mb-4'>
                    <h2>Created By Information:</h2>
                    <p>Name: {createdByInfo.name}</p>
                    <p>Bio: {createdByInfo.bio}</p>
                    <p>Email: {createdByInfo.email}</p>
                    {/* Add more createdByInfo fields as needed */}
                </div>
            )}

            {campaigns && campaigns.length > 0 && (
                <table className='border-collapse border w-full'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Goal Amount</th>
                            <th>Category</th>
                            {/* Add more table headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map(
                            ({
                                campaignId,
                                title,
                                goalAmount,
                                category,
                                collectedAmount,
                                startDate,
                                endDate
                            }: any) => (
                                <tr key={campaignId} className='border'>
                                    <td>{title}</td>
                                    <td>{goalAmount}</td>
                                    <td>{category?.name}</td>
                                    {/* Add more table data cells as needed */}
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default YourPage;
