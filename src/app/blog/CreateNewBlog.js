import axios from 'axios';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { AuthAPI } from '../../src/api';
import { Notify } from '../../src/core/components/toastify/Toastify';
import { AuthContext } from '../../src/core/contexts/authContext';

export default function CreateNewBlog() {
    const [blogs, setBlogs] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [categoryInputVisible, setCategoryInputVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const { authState, userData } = useContext(AuthContext);
    const [userId, setUserId] = useState([]);
    const [hospitals, setHospitals] = useState([])
    const [blogNameLabel, setBlogNameLabel] = useState('BlogName');
    const [blogCategoryLabel, setBlogCategoryLabel] = useState('Blog Category');
    const [blogDetailLabel, setBlogDetailLabel] = useState('Blog Detail');


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
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/hospital/`)
            .then((res) => {
                setHospitals(res.data)
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    const hospital = hospitals.find(hospital => hospital.userId == userId)
    const blog = blogs.filter(blog => blog.userId == userId)
    const approvedBlogs = blog.filter(blog => blog.status === "0");
    const approvedBlogCount = approvedBlogs.length;
    const blockedBlogs = blog.filter(blog => blog.status === "1");
    const blockedBlogCount = blockedBlogs.length;
    const formattedDate = new Date(blog[1]?.date).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }) ?? 'Invalid Date';

    const handleTitleChange = (e) => {
        setBlogNameLabel(e.target.value || 'BlogName');
    };

    const handleCategoryInputChange = (e) => {
        setBlogCategoryLabel(e.target.value || 'Blog Category');
    };

    const handleDetailChange = (e) => {
        setBlogDetailLabel(e.target.value || 'Blog Detail');
    };


    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        setSelectedImage(image);
    };

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`)
            .then((res) => setBlogs(res.data))
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const categories = [...new Set(blogs.map((item) => item.category))];

    const handleCategoryChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'addNew') {
            setCategoryInputVisible(true);
            setSelectedCategory('');
            setBlogCategoryLabel(e.target.value || 'Blog Category');

        } else {
            setCategoryInputVisible(false);
            setSelectedCategory(selectedValue);
            setBlogCategoryLabel(e.target.value || 'Blog Category');

        }
    };

    const handleNewCategoryChange = (e) => {
        setNewCategory(e.target.value);
        setBlogCategoryLabel(e.target.value || 'Blog Category');

    };

    const postData = async (e) => {
        e.preventDefault();
        const imageUrl = URL.createObjectURL(selectedImage);
        const requestBody = {
            category: selectedCategory || newCategory,
            title: e.target.title.value,
            detail: e.target.detail.value,
            image: imageUrl,
        };
        try {
            const res = await AuthAPI.post(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`, requestBody);
            if (res.data) {
                Notify('success', 'New Blog created.');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            Notify('error', error.response?.data?.message || 'There is some error!');
        }
    };

    return (
        <div className='flex flex-col gap-5'>
            <div className=" container flex flex-col ">
                <div className="flex flex-col lg:flex-row lg:justify-between  lg:px-16">
                    <div className="flex flex-col justify-center items-start gap-3 mb-20 ">
                        <div className="w-12 h-12 rounded-3xl overflow-hidden">
                            <div className="w-100% h-100% object-contain rounded-3xl">
                                <img src="/img/images.png" alt={hospital?.fullname} />
                            </div>
                        </div>
                        <div>
                            <div className="text-base font-semibold">
                                {hospital?.fullname}
                            </div>
                            <div className="text-base font-normal">
                                {hospital?.location}
                            </div>
                            <div className="flex gap-1">
                                <div className="text-base font-normal">Verified by</div>
                                <div className="w-[136px] h-[21px]">
                                    <img src="/img/carehorn 12.png" alt="carehorn" />
                                </div>
                            </div>
                            <div>
                                <div className="  bg-[#ECEEFF] w-96 h-7 flex justify-center items-center mt-3 text-base font-semibold font-poppins ">
                                    Total Created Blogs : {blog.length}
                                </div>
                                <div className="flex justify-center gap-3 py-3">
                                    <div className="  bg-[#ECEEFF] w-44 h-7 flex justify-center items-center text-base font-normal font-poppins ">
                                        Approved:{approvedBlogCount}
                                    </div>
                                    <div className="  bg-[#ECEEFF] text-red-600 w-44 h-7 flex justify-center items-center text-base font-normal  font-poppins ">
                                        Blocked: {blockedBlogCount}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="flex flex-col gap-3 items-center justify-center ">
                        <div className=" flex flex-col shadow-sm rounded-2xl lg:w-[403px] w-full  bg-[#FAFAFE] p-3">
                            <div className="flex items-center justify-center pt-3">
                                <img
                                    src="/img/woman.png"
                                    alt="doctor image"
                                    className=" flex p-1 bg-slate-400 rounded-2xl  justify-center items-center"
                                />
                            </div>
                            <div className="flex flex-col p-3">
                                <span className="text-base font-semibold font-poppins">
                                    {blogNameLabel}

                                </span>
                                <span className="text-[#2540C4] text-xs font-normal">
                                    {blogCategoryLabel}
                                </span>
                                <span className=" text-xs font-normal">
                                    {blogDetailLabel}
                                </span>
                            </div>

                            <div className="flex flex-col p-1 ">
                                <div className='flex justify-between  '>
                                    <div className='flex gap-2'>
                                        <img src="/img/profile1.jpg" alt="doc image" className="w-8 h-8 rounded-full" />
                                        <div className='flex flex-col'>
                                            <div className='text-xs font-semibold'> Written by {blog[1]?.publishedby}</div>
                                            <div className='text-xs'>
                                                {formattedDate}
                                            </div>
                                            <img src="/img/carehorn 12.png" alt="carehorn" className='w-20 h-auto' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className="flex gap-2 ">
                                            <div className='text-xs'>Share</div>
                                            <img src="/img/shareicon.svg" alt="icon" className="w-3 h-3" />
                                        </div>
                                        <div className='text-xs'>Blocked: {blog?.status === "0" ? "Blocked" : "Not Blocked"}</div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <span className='text-xs text-grey-100 '>Preview</span>
                    </div>

                </div>

            </div >
            <hr className="border-b border-solid border-black" />
            <span className="flex justify-center items-center text-4xl font-semibold  mt-30 px-20 text-blue-600">Create New Blog</span>

            <form className='container flex flex-col justify-center items-center w-full gap-10' onSubmit={(e) => postData(e)}>
                <div className='flex justify-between w-full flex-col md:flex-row gap-2 '>
                    <div className='flex w-full  flex-col gap-3'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-gray-500'>
                                Blog Title <span className='text-red-500'> *</span>
                            </span>
                            <input
                                type='text'
                                name='title'
                                onChange={handleTitleChange}
                                placeholder='Enter the blog title here'
                                className='w-full border-b-[1.5px] border-gray-400 focus:outline-none text-base font-medium  '
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-gray-500'>
                                Blog Categories <span className='text-red-500'> *</span>
                            </span>
                            <select
                                name='category'
                                className='rounded focus:outline-none border-gray-400 text-gray-600 w-48 p-1'
                                onChange={handleCategoryChange}
                            >
                                <option value='' disabled selected>
                                    Select
                                </option>
                                {categories?.map((item) => (
                                    <option value={item} key={item}>
                                        {item}
                                    </option>
                                ))}
                                <option value='addNew'>Add New Category</option>
                            </select>
                            {categoryInputVisible && (
                                <input
                                    type='text'
                                    placeholder='Enter new category'
                                    value={newCategory}
                                    onChange={handleNewCategoryChange}
                                    className='w-full border-[1.5px] border-gray-400 focus:outline-none rounded p-2.5 mt-2'
                                />
                            )}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-gray-500'>
                                Blog Description <span className='text-red-500'> *</span>
                            </span>
                            <textarea name='detail' placeholder='Enter the Blog description here'
                                onChange={handleDetailChange}
                                className='w-full border-[1.5px] h-32 border-gray-400 focus:outline-none rounded-2xl p-2.5' />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 flex flex-col justify-start'>
                        <div className='flex flex-col justify-center w-full items-center'>
                            <input type='file' accept='image/*' id='imageUpload' required onChange={handleImageUpload} className='hidden' />
                            {selectedImage && (
                                <div className='h-52 w-72 object-cover'>
                                    <Image
                                        src={URL.createObjectURL(selectedImage)}
                                        alt='Selected'
                                        layout='responsive'
                                        width={300}
                                        height={200}
                                        className=' flex p-1 bg-slate-400 rounded-2xl  justify-center items-center'
                                    />
                                </div>
                            )}
                            <label htmlFor='imageUpload' className=' w-[126px] h-[37px] rounded-3xl flex justify-center items-cente  cursor-pointer bg-black text-white  py-2 px-4'>
                                Upload
                            </label>
                            <p className='pt-2 text-sm'>Only JPG, PNG images </p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-20'>
                    <button type='submit' className='w-[126px] h-[37px] rounded-3xl bg-[#1560DB] text-white flex justify-center items-center'>
                        Create
                    </button>
                    <button className='w-[126px] h-[37px] rounded-3xl bg-red-600 text-white flex justify-center items-center'>
                        Cancle
                    </button>
                </div>
            </form>
        </div>
    );
}
