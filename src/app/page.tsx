'use client';
import { FrontCard, LandingSection } from '@sahayeta/components';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [campaign, setCampaign] = useState<any>();

  useEffect(() => {
    axios.get('/api/campaigns/', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setCampaign(response.data);
      })
      .catch(error => {
        console.error('Axios error:', error);
      });
  }, []);

  return (
    <>
      <LandingSection />
      <div className="container text-black p-3 grid grid-cols-3 justify-center items-center">
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
            );
          }
        )}
      </div>
    </>
  );
}
