import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { AuthAPI } from '../../src/api';
import { AuthContext } from "../../src/core/contexts/authContext";
import PopUpDelete from './PopUpDelete';
import PopUpEdit from './PopUpEdit';


const SearchBox = () => {
    const router = useRouter();
    const { authState, userData } = useContext(AuthContext);
    const [userId, setUserId] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (authState.isAuth && userData) {
                const userId = userData._id;
                setUserId(userId);
            }
        };

        const fetchDataAsync = async () => {
            await fetchData();
        };

        fetchDataAsync();
    }, [authState.isAuth, userData]);

    useEffect(() => {
        AuthAPI
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/`)
            .then((res) => {
                setBlogs(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const categories = [...new Set(blogs.map((item) => item.category))];
    useEffect(() => {
        const filteredBlogs = blogs.filter(blog => blog.userId === userId);
        setResult(filteredBlogs);
    }, [blogs, userId]);

    const handleSubmit = (query) => {
        const filteredPosts = blogs.filter(post => {
            const matchCategory = post.category.toLowerCase().includes(query.toLowerCase());
            const matchTitle = post.title.toLowerCase().includes(query.toLowerCase());
            return matchCategory || matchTitle;
        });
        setResult(filteredPosts);
    };

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === '') {
            setResult(blogs.filter(blog => blog.userId === userId));
        } else {
            handleSubmit(query);
        }
    };
    return (
        <div className='w-full'>
            <div className='flex justify-between container py-3 w-full'>
                <input
                    type="text"
                    placeholder="Search anything related to the blog..."
                    id="search"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className='bg-[#ECEEFF] w-2/3 px-3 py-2 rounded-3xl  text-sm placeholder-gray-500 outline-none'
                />
                <select className='flex w-1/4'>
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
                {result.map(post => (
                    <div className="bg-white container shadow-2xl rounded-2xl p-5 mb-3" key={post._id}>
                        <div className='lg:flex gap-20 justify-between'>
                            <div className='flex flex-col w-full lg:w-1/2'>
                                <span className="text-base font-semibold font-poppins">
                                    {post.title}
                                </span>
                                <span className="text-[#2540C4] text-xs font-normal">Category:{post.category}</span>
                                <span className="text-sm text-gray-500 font-normal font-poppins">
                                    {post.detail}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 lg:items-center justify-center mt-1 ">
                                <div >
                                    <img
                                        src="/img/woman.png"
                                        alt="doctor image"
                                        className="w-full flex p-1 bg-slate-400 rounded-2xl "
                                    />
                                </div>
                                <div className='flex lg:items-center justify-center'>
                                    <button className="w-[126px] h-[37px] rounded-3xl bg-green-500 text-white flex justify-center items-center gap-1">
                                        <span>Published</span>
                                        <img src="/img/tik.svg" alt="CMC" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='lg:flex lg:gap-16'>
                            <div className='flex gap-8 lg:gap-16 mt-3'>
                                <div className='flex gap-2'>
                                    <img src="/img/profile1.jpg" alt="doc image" className="w-8 h-8 rounded-full" />
                                    <div className='flex flex-col'>
                                        <div className='text-xs font-semibold'> Written by {post.publishedby}</div>
                                        <div className='text-xs'>Published on {format(new Date(post.date), 'yyyy-MM-dd')}</div>
                                        <img src="/img/carehorn 12.png" alt="`carehorn" className='w-20 h-auto' />
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className="flex gap-2 ">
                                        <div className='text-xs'>Share</div>
                                        <img src="/img/shareicon.svg" alt="icon" className="w-3 h-3" />
                                    </div>
                                    <div className='text-xs'>Blocked:No</div>
                                </div>
                            </div>
                            <div className='flex gap-8 lg:gap-16 mt-3'>
                                <PopUpEdit blogId={post._id} />
                                <button className=" px-4 rounded-3xl bg-[#1560DB] text-white flex justify-center items-center gap-1" onClick={() => router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${post.category}/${post._id}`)}>
                                    <span> View</span>
                                    <img src="/img/eyeicon.svg" alt="CMC" />
                                </button>
                                <PopUpDelete blogId={post._id} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBox;
