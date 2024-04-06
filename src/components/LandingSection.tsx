'use client'
import { Combobox, Transition } from '@headlessui/react'
import { CampaignCard, Loading } from '@sahayeta/components'
import { SearchIcon } from '@sahayeta/icons'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { BsBookmarkFill, BsSearchHeart } from 'react-icons/bs'

export default function LandingSection() {
  const [campaigns, setCampaigns] = useState<any[]>([])

  const [selected, setSelected] = useState(campaigns[0])
  const [query, setQuery] = useState('')

  const filteredcampaigns: { campaignId: number; title: string }[] =
    query === ''
      ? campaigns
      : campaigns.filter((campaign: { campaignId: number; title: string }) =>
        campaign.title
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );


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
  })

  const displayedCampaigns = campaigns.slice(0, 3)
  const displayedHeroCampaigns = campaigns.slice(0, 5)

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-10 bg-blue-700 px-5 py-8 lg:py-16">
        <div className="text-center text-xl font-medium text-white lg:text-3xl lg:font-bold">
          Empower Change, Inspire Hope Your Contribution Makes a Difference
        </div>
        <div className="text-center text-sm text-white lg:text-xl">
          Sahayata Uniting Hearts, Transforming Lives – Be the Difference Today!
        </div>


        <div className='w-1/2'>
          <Combobox value={selected} onChange={setSelected}>
            <div className="relative">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-3.5 px-5 text-sm leading-5 text-gray-900 focus:outline-none"
                  placeholder={"Enter your query"}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-3 flex items-center pr-2">
                  <BsSearchHeart
                    className="h-5 w-5 text-blue-500"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-50">
                  {filteredcampaigns.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredcampaigns.map((campaign) => (
                      <Combobox.Option
                        key={campaign.campaignId}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'
                          }`
                        }
                        value={campaign.title}
                      >
                        {({ selected, active }) => (
                          <>
                            <Link href={"/campaigns/" + campaign.campaignId}>
                              <span
                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                  }`}
                              >
                                {campaign.title}
                              </span></Link>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-600'
                                  }`}
                              >
                                <BsBookmarkFill className="h-3 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>

        <div className='flex gap-4'>
          {displayedCampaigns.map(
            ({
              campaignId,
              category

            }: any) => {
              return (
                <Link href={"/campaigns/" + campaignId} className="flex gap-2 items-center justify-center rounded  bg-slate-100/30 py-2 px-3 text-white" key={campaignId}>
                  <div className="flex h-3 w-3 items-center text-white">
                    {SearchIcon}
                  </div>
                  <p className="text-xs">
                    {category.displayName}
                  </p>
                </Link>
              )
            }
          )
          }

        </div>

        <div className="container grid w-full grid-cols-2 items-center justify-center gap-5 lg:grid-cols-5">
          {displayedHeroCampaigns.map(
            ({
              campaignId,
              image,
              category,

            }: any) => {
              return (
                <Link href={"/campaigns/" + campaignId}
                  className="flex flex-col items-center gap-2 " key={campaignId}>
                  <div className="h-28 w-44 rounded-2xl border-4 border-blue-300 p-0.5">
                    <div className="relative h-full w-full items-center overflow-hidden  rounded-xl">
                      <Image
                        src={image || "/assets/img/placeholder.png"}
                        fill
                        alt=""
                        quality={100}
                        className="object-cover"
                        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                  <div className=" flex  items-center font-medium text-white">
                    {category.displayName}
                  </div>
                </Link>
              )
            }
          )
          }
        </div>
      </div >
      <div className="flex w-full flex-col  items-center justify-between  gap-5 bg-[#c7ecff] py-8 lg:flex-row lg:px-64">
        <p className="flex items-center font-semibold ">
          Harmony in Giving Sahayata, Your Bridge to Positive Change.
        </p>

        <button>
          <Link
            href="/create-campaign"
            className=" inline-block items-center rounded border border-transparent  bg-blue-600 p-3 font-medium text-white duration-300 hover:border hover:border-blue-400 hover:bg-transparent hover:text-black "
          >
            Create Campaign
          </Link>
        </button>
      </div>
      <p className="py-6 text-center text-xl font-semibold ">
        Join the Urgent Cause
      </p>
      {
        displayedCampaigns.length !== 0 ? (
          <div className="container flex w-full flex-col">
            <div className=" grid grid-cols-3 items-center justify-center gap-5 p-3 text-black">
              {displayedCampaigns.map(
                ({
                  campaignId,
                  image,
                  title,
                  description,
                  payment,
                }: any) => {
                  // const raisedAmount = payment.map((pay) => pay  );
                  // console.log(raisedAmount);

                  return (
                    <CampaignCard
                      key={campaignId}
                      campaignId={campaignId}
                      campaignImageAlt={title}
                      campaignImageURL={image}
                      campaignTitle={title}
                      campaignDescription={description}
                      // campaignRaisedAmount={raisedAmount}
                      numberOfDonors={0}
                    />
                  )
                }
              )}
            </div>
            <div className="container flex items-center justify-center py-8 ">
              <button>
                <Link
                  href="/campaigns"
                  className=" inline-block items-center rounded border border-transparent  bg-blue-600 p-3 font-medium text-white duration-300 hover:border hover:border-blue-400 hover:bg-transparent hover:text-black "
                >
                  View more Campaigns
                </Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center">
            <Loading />
          </div>
        )
      }
    </>
  )
}
