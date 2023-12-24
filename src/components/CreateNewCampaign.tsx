"use client"
import axios from 'axios'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'


export const CreateNewCampaign = () => {
    const [categories, setCategories] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [campaignNameLabel, setCampignNameLabel] = useState('CampaignName');
    const [campaignCategoryLabel, setCampignCategoryLabel] = useState('CampaignCategory');
    const [campaignDetailLabel, setCampignDetailLabel] = useState('CampaignDetail');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/category/')
                const data = await response.json()
                const categoryNames = data.category.map(category => category.name)
                setCategories(categoryNames)
            } catch (error) {
                console.error('Error fetching category data:', error)
            }
        }

        fetchData()
    }, [])
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
            const response = await fetch('/api/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                Notify('success', 'New campaign created.');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                const errorData = await response.json();
                Notify('error', errorData.message || 'There is some error!');
            }
        } catch (error) {
            Notify('error', 'There is some error!');
        }

    };
    const handleTitleChange = (e) => {
        setCampignNameLabel(e.target.value || 'BlogName');
    };

    const handleCategoryInputChange = (e) => {
        setCampignCategoryLabel(e.target.value || 'Blog Category');
    };

    const handleDetailChange = (e) => {
        setCampignDetailLabel(e.target.value || 'Blog Detail');
    };


    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        setSelectedImage(image);
    };


    return (
        <div className='flex flex-col gap-5 '>
            <div className=" container flex flex-col justify-center items-center w-full gap-10" >
                <div className="flex flex-col justify-between w-full  lg:flex-row lg:justify-between  lg:px-16">
                    <div className="flex flex-col justify-center items-start gap-3 mb-20 ">
                        <div className="w-12 h-12 rounded-3xl overflow-hidden">
                            <div className="w-100% h-100% object-cover rounded-xl">
                                <img src="/assets/img/donateicon.png" alt='demo' />
                            </div>
                        </div>
                        <div>
                            <div className="text-base font-semibold">
                                organization fullname
                            </div>
                            <div className="text-base font-normal">
                                organization location
                            </div>
                            <div className="flex gap-1">
                                <div className="text-base font-normal">Verified by</div>
                                <div className="w-[100px] h-[21px]">
                                    <img src="/assets/img/logo.png" alt="demo" />
                                </div>
                            </div>
                            <div>
                                <div className="  bg-[#ECEEFF] w-96 h-7 flex justify-center items-center mt-3 text-base font-semibold font-poppins ">
                                    Total Created Campaigns(5)
                                </div>
                                <div className="flex justify-center gap-3 py-3">
                                    <div className="  bg-[#ECEEFF] w-44 h-7 flex justify-center items-center text-base font-normal font-poppins ">
                                        Approved:(4)
                                    </div>
                                    <div className="  bg-[#ECEEFF] text-red-600 w-44 h-7 flex justify-center items-center text-base font-normal  font-poppins ">
                                        Blocked: (1)
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="flex flex-col gap-3 items-center justify-center ">
                        <div className=" flex flex-col shadow-sm rounded-2xl lg:w-[403px] w-full  bg-[#FAFAFE] p-3">
                            <div className="flex items-center justify-center pt-3">
                                <img
                                    src="/assets/img/children.jpg"
                                    alt="doctor image"
                                    className=" flex p-1 bg-slate-400 rounded-2xl  justify-center items-center"
                                />
                            </div>
                            <div className="flex flex-col p-3">
                                <span className="text-base font-semibold font-poppins">
                                    CampaignNameLabel

                                </span>
                                <span className="text-[#2540C4] text-xs font-normal">
                                    CampaignCategoryLabel
                                </span>
                                <span className=" text-xs font-normal">
                                    CampaignDetailLabel
                                </span>
                            </div>

                            <div className="flex flex-col p-1 ">
                                <div className='flex justify-between  '>
                                    <div className='flex gap-2'>
                                        <img src="/assets/img/profile.jpg" alt="doc image" className="w-8 h-8 rounded-full" />
                                        <div className='flex flex-col'>
                                            <div className='text-xs font-semibold'> created by anjali</div>
                                            <div className='text-xs'>
                                                formattedDate
                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className="flex gap-2 ">
                                            <div className='text-xs'>Share</div>
                                            <img src="/assets/img/shareicon.svg" alt="icon" className="w-3 h-3" />
                                        </div>
                                        <div className='text-xs'>Blocked</div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <span className='text-xs text-grey-100 '>Preview</span>
                    </div>

                </div>

            </div >
            <hr className="border-b border-solid border-black" />
            <span className="flex justify-center items-center text-4xl font-semibold  mt-30 px-20 text-blue-600">Create New  Campaign</span>

            <form className='container flex flex-col justify-center items-center w-full gap-10 py-6' onSubmit={(e) => postData(e)}>
                <div className='flex justify-between w-full flex-col md:flex-row gap-2 '>
                    <div className='flex w-full  flex-col gap-3'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-gray-500'>
                                Campaign Title <span className='text-red-500'> *</span>
                            </span>
                            <input
                                type='text'
                                name='title'
                                onChange={handleTitleChange}
                                placeholder='Enter the  Campaign title here'
                                className='w-full border-b-[1.5px] border-gray-400 focus:outline-none text-base font-medium  '
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-gray-500'>
                                Campaign Categories <span className='text-red-500'> *</span>
                            </span>

                            <div className="flex ">
                                <select className="w-44 py-2 px-3 rounded outline-none border-1 border-gray-400" >
                                    <option
                                        value=""
                                        disabled
                                        selected
                                        className=""
                                    >
                                        Select
                                    </option>
                                    {categories.map(category => (
                                        <option
                                            value={category}
                                            key={category}
                                            className=""
                                        >
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <span className='text-gray-500'>
                                Campaign Description <span className='text-red-500'> *</span>
                            </span>
                            <textarea name='detail' placeholder='Enter the  Campaign description here'
                                onChange={handleDetailChange}
                                className='w-full border-[1.5px] h-32 border-gray-400 focus:outline-none rounded p-2.5' />
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 flex flex-col justify-start'>
                        <div className='flex flex-col justify-center w-full items-center'>
                            <input type='file' accept='image/*' id='imageUpload' required className='hidden' />
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
    )
}
function Notify(arg0: string, arg1: any) {
    throw new Error('Function not implemented.')
}

