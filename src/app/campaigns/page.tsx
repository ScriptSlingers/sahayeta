'use client'
import { FrontCard } from '@sahayeta/components'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CampaignsPage() {
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
    <div className='flex justify-center items-center flex-col py-5'>
      <button>
        <Link
          href="/create-campaign"
          className=" items-center text-white bg-blue-600 rounded p-3  font-medium inline-block hover:bg-transparent hover:border-blue-400 hover:text-black duration-300 hover:border border border-transparent "
        >
          Create Campaigns
        </Link>
      </button>
      <div className="container text-black p-3 gap-3 grid grid-cols-3 justify-center items-center">
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
            )
          }
        )}
      </div>
    </div >
  )
}
