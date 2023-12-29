
'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { format } from 'date-fns';
import axios from 'axios';


interface Campaign {
    campaignId: string;
    title: string;
    category: {
        title: string;
    };
    description: string;
    image: string;
    createdBy: {
        id: string;
        username: string;
        profileImage: string;
    };
}

type ApiResponse = Campaign[];


const SearchBox: React.FC = () => {
    const [creatorId, setCreatorId] = useState('');
    const [campaigns, setCampaigns] = useState<ApiResponse>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState<ApiResponse>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 5;

    const offset = currentPage * postsPerPage;
    const paginatedPosts = result.slice(offset, offset + postsPerPage);
    const pageCount = Math.ceil(result.length / postsPerPage);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/campaigns');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data: ApiResponse = await response.json();
                setCampaigns(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredCampaigns = Array.isArray(campaigns)
            ? campaigns.filter(campaign => campaign?.createdBy.id === creatorId)
            : [];

        setResult(filteredCampaigns);
    }, [campaigns, creatorId]);

    const handleSubmit = (query: string) => {
        const filteredPosts = campaigns?.filter(post => {
            const categoryString = typeof post.category === 'string' ? post.category : '';
            const matchCategory = categoryString.toLowerCase().includes(query.toLowerCase());
            const matchTitle = post.title.toLowerCase().includes(query.toLowerCase());
            return matchCategory || matchTitle;
        });
        setResult(filteredPosts);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setResult(campaigns.filter(campaign => campaign?.createdBy.id === creatorId));
        } else {
            handleSubmit(query);
        }
    };


    const [categories, setCategories] = useState<string[]>([]);

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
                <select className='flex w-1/4' onChange={handleInputChange}
                >
                    <option value='' disabled selected>
                        Select
                    </option>
                    {categories?.map((item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}

                </select>
            </div>
            <div>
                <div className="bg-[#546DEA] flex justify-center items-center h-16 w-full text-white text-xl">
                    My Created Blogs ( {result.length} )
                </div>

                {paginatedPosts.map((post) => (
                    <div className="bg-white container shadow-2xl rounded-2xl p-5 mb-3" key={post.campaignId}>
                        <div className='lg:flex gap-20 justify-between'>
                            <div className='flex flex-col w-full lg:w-1/2'>
                                <span className="text-base font-semibold font-poppins">
                                    {post.title}
                                </span>
                                <span className="text-[#2540C4] text-xs font-normal">Category: {post.category.title}</span>
                                <span className="text-sm text-gray-500 font-normal font-poppins" dangerouslySetInnerHTML={{ __html: post.description }} />
                            </div>
                            <div className="flex flex-col gap-2 lg:items-center justify-center mt-1 ">
                                <div>
                                    <img
                                        src={post.image} // Assuming 'image' is the property containing the image URL
                                        alt="campaign image"
                                        className="w-80 flex p-1 bg-slate-400 rounded-2xl"
                                    />
                                </div>
                                <div className='flex lg:items-center justify-center'>
                                    <button className="w-[126px] h-[37px] rounded-3xl bg-green-500 text-white flex justify-center items-center gap-1">
                                        <span>Published</span>
                                        <img src="/img/tik.svg" alt="done" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='lg:flex lg:gap-16'>
                            <div className='flex gap-8 lg:gap-16 mt-3'>
                                <div className='flex gap-2'>
                                    <img src={post.createdBy.profileImage} alt="user image" className="w-8 h-8 rounded-full" />
                                    <div className='flex flex-col'>
                                        <div className='text-xs font-semibold'> Written by {post.createdBy.username}</div>
                                        {/* <div className='text-xs'>Published on {format(new Date(post.createdAt), 'yyyy-MM-dd')}</div> */}
                                        <img src="/img/carehorn.png" alt="`carehorn" className='w-20 h-auto' />
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <Link href={"https://facebook.com/share.php?"} className='cursor-pointer'>
                                        <div className='flex gap-2 cursor-pointer'>
                                            <div className='text-xs'>Share</div>
                                            <img src="/img/shareicon.svg" alt="icon" className="w-3 h-3" />
                                        </div>
                                    </Link>
                                    <div className='text-xs'>Blocked: No</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


                <ReactPaginate
                    pageCount={pageCount}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination flex justify-center mt-4'}
                    pageClassName={'bg-[#546DEA] text-white px-4 py-2 mr-2 rounded-md cursor-pointer'}
                    activeClassName={'bg-[#2540C4]'}
                    previousClassName={'border border-[#546DEA] text-[#546DEA] px-4 py-2 mr-2 rounded-md cursor-pointer'}
                    nextClassName={'border border-[#546DEA] text-[#546DEA] px-4 py-2 ml-2 rounded-md cursor-pointer'}
                    breakClassName={'bg-[#546DEA] text-white px-4 py-2 mr-2 rounded-md cursor-pointer'}
                />
            </div>
        </div >
    );
};

export default SearchBox;
