'use client'
import React from 'react'
import Campaign from '@sahayeta/components/Campaign'
import { useEffect, useState } from 'react'
import { CampaignCard } from '@sahayeta/components/CampaignCard'

export default function Page() {
  const [campaign, setCampaign] = useState<any>()

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
    <>
      <Campaign />
      <div className="container grid grid-cols-6 items-center justify-center p-3 text-black">
        {campaign?.Campaigns.map(
          ({
            campaignId,
            image,
            title,
            description,
            currentAmount,
            collectedAmount
          }: any) => {
            return (
              <CampaignCard
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
    </>
  )
}
