import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const CampaignCard = ({
  campaignId,
  campaignImageURL,
  campaignImageAlt,
  campaignTitle,
  campaignDescription,
  campaignRaisedAmount,
  campaignDonor,
}: any) => {
  return (
    <div
      key={campaignId}
      className="flex h-full flex-col justify-between gap-5 p-5 shadow"
    >
      <div className="flex flex-col gap-5">
        <Link href={'/campaigns/' + campaignId}>
          <div className="relative flex h-48 w-full overflow-hidden rounded-lg ">
            <Image
              src={campaignImageURL}
              alt={campaignImageAlt}
              fill
              className="rounded object-cover"
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </Link>
        <div className="text-xl font-semibold">{campaignTitle}</div>
        <div className="flex justify-center text-justify align-middle text-gray-500 ">
          {`${campaignDescription.slice(0, 500)}${campaignDescription.length > 1000000 ? '...' : ''
            }`}
        </div>
      </div>
      <div className="flex justify-between font-medium">
        <div className="">NPR. {campaignRaisedAmount || '0'} Raised</div>
        <div className=""> {campaignDonor || '0'} No. of donors</div>
      </div>
    </div>
  )
}
