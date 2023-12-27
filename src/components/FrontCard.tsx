import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const FrontCard = ({
  campaignId,
  campaignImageURL,
  campaignImageAlt,
  campaignTitle,
  campaignDescription,
  campaignCurrentAmount,
  campaignCollectedAmount,
  campaignCategory
}: any) => {
  return (
    <div>
      <div key={campaignId} className="grid grid-cols-3 shadow  ">
        <div className="flex flex-col  p-5 w-[500px]  gap-6">
          <div className="relative flex h-48 w-full ">
            <Link href={"/campaigns/" + campaignId}>
              <Image
                src={campaignImageURL}
                alt={campaignImageAlt}
                fill
                className="object-cover rounded"
              />
            </Link>
          </div>
          <div className="text-xl font-semibold">{campaignTitle}</div>

          <div className="text-gray-500 flex justify-center align-middle ">
            {campaignDescription}
          </div>
          <div className="flex justify-between font-medium">
            <div className="">NRP {campaignCurrentAmount} Raised</div>
            <div className="">NRP {campaignCollectedAmount} Donations</div>
          </div>
        </div>
      </div>
    </div>
  )
}
