'use client'
import FrontCard from '@sahayeta/components/FrontCard';

import { useEffect, useState } from 'react';
export default function Page() {
  const [campaign, setCampaign] = useState<any>()

  useEffect(() => {
    fetch(`/api/campaigns/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setCampaign(data);
        console.log(data)
      })

  }, [])

  return (
    <>


      <div className='container  p-3 grid grid-cols-3 justify-center items-center'>
        {/* {campaign?.Campaigns.map} */}
        {campaign?.Campaigns.map((campaign: any) => {
          { JSON.stringify(campaign?.title) }

          <FrontCard

            key={campaign?.campaignId}
            campaignId={campaign?.campaignId}
            campaignImageURL={campaign?.image}
            campaignTitle={campaign?.title}
            campaignDescription={campaign?.description}
            campaignCurrentAmount={campaign?.currentAmount}
            campaignCollectedAmount={campaign?.collectedAmount}
          />
        })}
      </div>



      {/* <Test /> */}
      {/* <div className="w-full flex flex-col md:flex-row justify-center items-center bg-indigo-100 text-black ">
        <div className="w-full md:w-2/5 flex flex-col p-4 md:p-10  md:gap-6">
          <div className="text-3xl md:text-5xl font-serif font-extralight">
            Donation can change the world
          </div>
          <p className="text-xl md:text-2xl font-semibold text-purple-500">
            Donation is a way of love
          </p>
          <p className="text-base md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex">
            <Link
              href="#"
              className="items-center text-white bg-purple-600 rounded-3xl py-2 px-4 md:px-6 font-medium inline-block mr-4
               hover:bg-transparent hover:border-purple-400 hover:text-black duration-300 hover:border border border-transparent"
            >
              Donate now
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative">
            <Image
              src="/assets/img/herosection.png"

              alt="Hero Section"
              width={500}
              height={300}
              className=""
              quality={100}
            />
          </div>
        </div>
      </div>  */}



    </>
  );
}
