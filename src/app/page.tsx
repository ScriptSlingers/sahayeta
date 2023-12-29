'use client'
import { FrontCard, LandingSection } from '@sahayeta/components'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function HomePage() {
  const [campaigns, setCampaigns] = useState<any[]>([])

  useEffect(() => {
    axios
      .get('/api/campaigns/', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setCampaigns(response.data.campaigns)
      })
      .catch(error => {
        console.error('Axios error:', error)
      })
  }, [])

  // Display only the first 6 campaigns
  const displayedCampaigns = campaigns.slice(0, 6)

  return (
    <>
      <LandingSection />

      <div className="container text-black p-3 grid grid-cols-3 justify-center items-center">
        {displayedCampaigns.map(
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
      <div className=" py-8 flex justify-center items-center gap-80">
        <button>
          <Link
            href="/create-campaign"
            className=" items-center text-white bg-blue-600 rounded p-3  font-medium inline-block hover:bg-transparent hover:border-blue-400 hover:text-black duration-300 hover:border border border-transparent "
          >
            Create Campaigns
          </Link>
        </button>
        <button>
          <Link
            href="/campaingns"
            className=" items-center text-white bg-blue-600 rounded p-3  font-medium inline-block hover:bg-transparent hover:border-blue-400 hover:text-black duration-300 hover:border border border-transparent "
          >
            View more Campaigns
          </Link>
        </button>
      </div>
    </>
  )
}
