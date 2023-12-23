'use client'
import { FrontCard } from '@sahayeta/components';
import LandingSection from '@sahayeta/components/LandingSection';
import { useEffect, useState } from 'react';

export default function Page() {
  const [campaign, setCampaign] = useState<any>()

  useEffect(() => {
    fetch(`/api/campaigns/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setCampaign(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <>
      <LandingSection />
      <div className='container text-black p-3 grid grid-cols-3 justify-center items-center'>
        {campaign?.Campaigns.map(({ campaignId, image, title, description, currentAmount, collectedAmount }: any) => {
          return (
            < FrontCard
              key={campaignId}
              campaignId={campaignId}
              campaignImageURL={image}
              campaignTitle={title}
              campaignDescription={description}
              campaignCurrentAmount={currentAmount}
              campaignCollectedAmount={collectedAmount}
            />
          )
        })}
      </div>
    </>
  );
}