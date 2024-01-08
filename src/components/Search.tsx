'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

export const Search: React.FC = () => {
  const [campaigns, setCampaigns] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [result, setResult] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const postsPerPage = 4

  const offset = currentPage * postsPerPage
  const paginatedPosts = result.slice(offset, offset + postsPerPage)
  const pageCount = Math.ceil(result.length / postsPerPage)

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected)
  }

  useEffect(() => {
    const filteredCampaigns = campaigns
    setResult(filteredCampaigns)
  }, [campaigns])

  const handleSubmit = (query: string) => {
    const filteredPosts = campaigns?.filter(campaign => {
      const categoryString =
        typeof campaign.category === 'string' ? campaign.category : ''
      const matchCategory = categoryString
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchTitle = campaign.title
        .toLowerCase()
        .includes(query.toLowerCase())
      return matchCategory || matchTitle
    })
    setResult(filteredPosts)
  }

  const handleInputChange = (e: any) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === '') {
      setResult(campaigns)
    } else {
      handleSubmit(query)
    }
  }

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

  return (
    <div className="w-full pt-16">
      <div className="flex justify-center items-center container py-3  w-full">
        <input
          type="text"
          placeholder="Search anything related to the Campaign...."
          value={searchQuery}
          onChange={handleInputChange}
          className="bg-[#ECEEFF] w-2/3 p-4  text-sm placeholder-gray-500 outline-none rounded placeholder:flex placeholder:justify-center placeholder:items-center placeholder:text-center"
        />
      </div>
      <div className=" flex  justify-center items-center flex-col">
        <div className="bg-blue-700 flex justify-center items-center p-4 container text-white text-base my-3 ">
          Total Created Campaigns ( {result?.length} )
        </div>

        {paginatedPosts.map(campaign => (
          <div
            className="bg-white container shadow-2xl rounded-2xl my-2 p-5 gap-5"
            key={campaign?.campaignId}
          >
            <div className="lg:flex gap-20 p-10 justify-between">
              <div className="flex flex-col w-full lg:w-1/2 gap-2">
                <button className=" w-44 items-center text-white bg-blue-700 rounded p-2  font-medium inline-block hover:bg-transparent hover:border-blue-400 hover:text-black duration-300 hover:border border border-transparent">
                  <span>{campaign?.status}</span>
                </button>
                <p className="text-base font-semibold font-poppins">
                  {campaign?.title}
                </p>
                <p className="text-[#2540C4] text-xs font-normal">
                  Category: {campaign?.category?.name}
                </p>
                <p className="text-sm text-gray-500 font-normal font-poppins">
                  {campaign?.description}
                </p>
                <div className="text-xs font-semibold">
                  Written by {campaign?.createdBy?.name}
                </div>
              </div>
              <div className="flex relative flex-col gap-2 lg:items-center justify-center w-96 h-auto">
                <div>
                  <Image
                    src={campaign?.image}
                    alt="campaign image"
                    fill
                    className="w-96 flex p-1 bg-slate-400 rounded-2xl"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-28 px-12">
              <button>
                <Link
                  href={'/campaigns/' + campaign.campaignId}
                  className="w-28 items-center text-white bg-blue-600 rounded p-2  font-medium inline-block hover:bg-transparent hover:border-blue-400 hover:text-black duration-300 hover:border border border-transparent "
                >
                  View
                </Link>
              </button>
              <button>
                <Link
                  href="/create-campaign"
                  className=" w-28 items-center text-white bg-blue-600 rounded p-2  font-medium inline-block hover:bg-transparent hover:border-blue-400 hover:text-black duration-300 hover:border border border-transparent "
                >
                  Donate
                </Link>
              </button>
            </div>
          </div>
        ))}

        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName={'pagination flex justify-center mt-4'}
          pageClassName={
            'bg-blue-700 text-white px-4 py-2 mr-2 rounded-md cursor-pointer '
          }
          activeClassName={'bg-blue-700'}
          previousClassName={
            'border border-blue-700 text-[#546DEA] px-4 py-2 mr-2 rounded-md cursor-pointer'
          }
          nextClassName={
            'border border-blue-700 text-[#546DEA]   px-4 py-2 mr-2 rounded-md cursor-pointer'
          }
          breakClassName={
            'bg-white text-white px-4 py-2 mr-2 rounded-md cursor-pointer'
          }
        />
      </div>
    </div>
  )
}
