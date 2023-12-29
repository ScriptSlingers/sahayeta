
'use client'
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';


const SearchBox: React.FC = () => {
    const [creatorId, setCreatorId] = useState('');
    const [campaigns, setCampaigns] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 4;

    const offset = currentPage * postsPerPage;
    const paginatedPosts = result.slice(offset, offset + postsPerPage);
    const pageCount = Math.ceil(result.length / postsPerPage);


    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    useEffect(() => {
        const filteredCampaigns = campaigns.filter(campaign => campaign?.createdBy.id === creatorId)

        setResult(filteredCampaigns);
    }, [campaigns, creatorId]);

    const handleSubmit = (query: string) => {
        const filteredPosts = campaigns?.filter(campaign => {
            const categoryString = typeof campaign.category === 'string' ? campaign.category : '';
            const matchCategory = categoryString.toLowerCase().includes(query.toLowerCase());
            const matchTitle = campaign.title.toLowerCase().includes(query.toLowerCase());
            return matchCategory || matchTitle;
        });
        setResult(filteredPosts);
    };

    const handleInputChange = (e: any) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setResult(campaigns);
        } else {
            handleSubmit(query);
        }
    };

    useEffect(() => {
        axios
            .get('/api/campaigns/', {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                setCampaigns(response.data.campaigns);
            })
            .catch(error => {
                console.error('Axios error:', error);
            });
    }, []);

    return (
        <div className="w-full">
            <div className='flex justify-between container py-3 w-full'>
                <input
                    type="text"
                    placeholder="Search anything related to the blog..."
                    id="search"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className='bg-[#ECEEFF] w-2/3 px-3 py-2 rounded-3xl  text-sm placeholder-gray-500 outline-none'
                />
            </div>
            <div className=' flex  justify-center items-center flex-col'>
                <div className="bg-[#546DEA] flex justify-center items-center h-16 w-full text-white text-xl my-5">
                    My Created Blogs ( {result?.length} )
                </div>

                {paginatedPosts.map((campaign) => (
                    <div className="bg-white container shadow-2xl rounded-2xl my-2 p-5 gap-5" key={campaign?.campaignId}>
                        <div className='lg:flex gap-20 justify-between'>
                            <div className='flex flex-col w-full lg:w-1/2 gap-2'>
                                <button className=" py-1 rounded-3xl bg-green-500 text-white w-40 text-sm">
                                    <span>{campaign?.status}</span>
                                </button>
                                <p className="text-base font-semibold font-poppins">
                                    {campaign?.title}
                                </p>
                                <p className="text-[#2540C4] text-xs font-normal">Category: {campaign?.category?.name}</p>
                                <p className="text-sm text-gray-500 font-normal font-poppins" >
                                    {campaign?.description}
                                </p>
                            </div>
                            <div className="flex relative flex-col gap-2 lg:items-center justify-center w-64 h-auto">
                                <div>
                                    <Image
                                        src={campaign?.image}
                                        alt="campaign image"
                                        fill
                                        className="w-80 flex p-1 bg-slate-400 rounded-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='text-xs font-semibold'>
                            Written by {campaign?.createdBy?.name}
                        </div>
                    </div>
                ))
                }
                <ReactPaginate
                    pageCount={pageCount}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination flex justify-center mt-4'}
                    pageClassName={'bg-[#546DEA] text-white px-4 py-2 mr-2 rounded-md cursor-pointer'}
                    activeClassName={'bg-[#2540C4]'}
                    previousClassName={'border border-[#546DEA] text-[#546DEA] hover:bg-[#2540C4 px-4 py-2 mr-2 rounded-md cursor-pointer'}
                    nextClassName={'border border-[#546DEA] text-[#546DEA] px-4 py-2 ml-2 rounded-md cursor-pointer'}
                    breakClassName={'bg-white text-white px-4 py-2 mr-2 rounded-md cursor-pointer'}
                />
            </div >
        </div >
    );
};

export default SearchBox;
