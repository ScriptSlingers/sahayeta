import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const CamapaignCard = ({
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
      className="flex flex-col h-full shadow p-5 gap-5 justify-between"
    >
      <div className="flex flex-col gap-5">
        <Link href={'/campaigns/' + campaignId}>
          <div className="relative flex h-48 w-full rounded-lg overflow-hidden ">
            <Image
              src={campaignImageURL}
              alt={campaignImageAlt}
              fill
              className="object-cover rounded"
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </Link>
        <div className="text-xl font-semibold">{campaignTitle}</div>
        <div className="text-gray-500 flex justify-center align-middle text-justify ">
          {`${campaignDescription.slice(0, 500)}${
            campaignDescription.length > 1000000 ? '...' : ''
          }`}
        </div>
      </div>
      <div className="flex justify-between font-medium">
        <div className="">NRP. {campaignCurrentAmount || '0'} Raised</div>
        <div className="">NRP. {campaignCollectedAmount || '0'} Donations</div>
      </div>
    </div>
  )
}
