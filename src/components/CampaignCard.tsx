import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export const CampaignCard = ({
  campaignId,
  campaignImageURL,
  campaignImageAlt,
  campaignTitle,
  campaignDescription,
  campaignCurrentAmount,
  campaignCollectedAmount
}: any) => {
  return (
    <div
      key={campaignId}
      className="flex flex-col ml-8 mt-10  bg-neutral-200 w-2/5 h-2/3 rounded-lg"
    >
      <div className="">
        <Link href={'/campaign/' + campaignId}>
          <Image
            src={campaignImageURL}
            alt={campaignImageAlt}
            width={400}
            height={100}
            className="rounded-t-lg"
            quality={100}
          />
        </Link>
        <div className="text-xl font-semibold">{campaignTitle}</div>
        <div className="text-gray-500 flex justify-center align-middle text-justify">
          {campaignDescription}
        </div>
        <div className="flex justify-between font-medium">
          <div className="">NRP. {campaignCurrentAmount || '0'} Raised</div>
          <div className="">
            NRP. {campaignCollectedAmount || '0'} Donations
          </div>
        </div>
      </div>
    </div>
  )
}
