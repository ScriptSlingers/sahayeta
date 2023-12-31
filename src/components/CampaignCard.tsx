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
    <div className=" flex flex-col ml-8 mt-10  bg-neutral-200 w-2/5 h-2/3 rounded-lg">
      <div className="">
        <Link href="/">
          <Image
            src="/assets/img/donation.jpg"
            alt="Hero Section"
            width={400}
            height={100}
            className="rounded-t-lg"
            quality={100}
          />
        </Link>
        <div className="m-2 space-y-3 ml-5 pt-2 ">
          <p className="font-semibold text-black text-heading6">
            Help This Child Get A Second Chance At Life.
          </p>
          <h1 className="font-semibold text-2xl text-black">$ 1500</h1>
          <p className="font-semibold text-gray-500">raised of $ 10,000 goal</p>
          <progress
            value={100}
            className="rounded-lg w-80 h-2.5 bg-blue-500"
          ></progress>
          <div className="flex flex-row gap-36 text-gray-500 font-semibold pb-4">
            <p>10 days left</p>
            <p>10 supporters</p>
          </div>
        </div>
      </div>
    </div>
  )
}
