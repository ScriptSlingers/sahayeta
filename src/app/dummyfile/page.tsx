// "use client"
// import axios from 'axios';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React, { useContext, useEffect, useState } from 'react';

// const SearchBox = () => {
//     const router = useRouter();
//     const [userId, setUserId] = useState('');
//     const [campaigns, setcampaigns] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('null');

//     const [result, setResult] = useState([]);
//     useEffect(() => {
//         const fetchDataAsync = async () => {
//             await fetchData();
//         };

//         fetchDataAsync();
//     }, [authState.isAuth, userData]);

//     useEffect(() => {
//         fetchData();
//     }, [authState.isAuth, userData]);


//     useEffect(() => {
//         axios
//             .get(`/api/category`,)
//             .then((res) => {
//                 setcampaigns(res.data)
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }, []);

//     const categories = [...new Set(campaigns.map((item) => item.category))];
//     useEffect(() => {
//         const filteredcampaigns = campaigns.filter(campaign => campaign.userId === userId);
//         setResult(filteredcampaigns);
//     }, [campaigns, userId]);

//     const handleSubmit = (query) => {
//         const filteredPosts = campaigns.filter(post => {
//             const matchCategory = post.category.toLowerCase().includes(query.toLowerCase());
//             const matchTitle = post.title.toLowerCase().includes(query.toLowerCase());
//             return matchCategory || matchTitle;
//         });
//         setResult(filteredPosts);
//     };

//     const handleInputChange = (e) => {
//         const query = e.target.value;
//         setSearchQuery(query);
//         if (query.trim() === '') {
//             setResult(campaigns.filter(campaign => campaign.userId === userId));
//         } else {
//             handleSubmit(query);
//         }
//     };
//     return (
//         <div className='w-full'>
//             <div className='flex justify-between container py-3 w-full'>
//                 <input
//                     type="text"
//                     placeholder="Search anything related to the campaign..."
//                     id="search"
//                     value={searchQuery}
//                     onChange={handleInputChange}
//                     className='bg-[#ECEEFF] w-2/3 px-3 py-2 rounded-3xl  text-sm placeholder-gray-500 outline-none'
//                 />
//                 <select className='flex w-1/4' onChange={handleInputChange}
//                 >
//                     <option value='' disabled selected>
//                         Select
//                     </option>
//                     {categories?.map((item) => (
//                         <option value={item} key={item}>
//                             {item}
//                         </option>
//                     ))}

//                 </select>
//             </div>
//             <div>
//                 <div className="bg-[#546DEA] flex justify-center items-center h-16 w-full text-white text-xl">
//                     My Created campaigns ( {result.length} )
//                 </div>
//                 {result.map(post => (
//                     <div>
//                         <div key={post.campaignId} className="grid grid-cols-3 shadow  ">
//                             <div className="flex flex-col  p-5 w-[500px]  gap-6">
//                                 <div className="relative flex h-48 w-full ">
//                                     <Link href={"/campaigns/" + post.campaignId}>
//                                         <Image
//                                             src={post.campaignImageURL}
//                                             alt={post.campaignImageAlt}
//                                             fill
//                                             className="object-cover rounded"
//                                         />
//                                     </Link>
//                                 </div>
//                                 <div className="text-xl font-semibold">{post.campaignTitle}</div>

//                                 <div className="text-gray-500 flex justify-center align-middle ">
//                                     {post.campaignDescription}
//                                 </div>
//                                 <div className="flex justify-between font-medium">
//                                     <div className="">NRP {post.campaignCurrentAmount} Raised</div>
//                                     <div className="">NRP {post.campaignCollectedAmount} Donations</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div >
//     );
// };

// export default SearchBox;
