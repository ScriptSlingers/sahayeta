import React, { useEffect, useState } from 'react';

const PopUp = ({ onClose }) => {
    return (
        <div className="w-96 flex-col justify-center items-center bg-white shadow-2xl rounded p-4">
            <div className="flex flex-col gap-3 justify-center items-center text-center">
                <p className="text-base font-medium font-poppins text-black">
                    Are you sure to Delete this ticket?
                </p>
                <span className="text-xs ">
                    If you delete this ticket it will be removed from your system
                    pernmentley, you can’t get it back.
                </span>
                <span className="text-xs font-medium  font-poppins text-black">

                    Yes, I want to remove this ticket now.
                </span>
            </div>

            <div className="flex justify-between p-3">
                <button
                    className="w-[80px] h-[37px] rounded-3xl bg-black text-white flex justify-center items-center gap-1"
                    onClick={onClose}
                > Cancel
                </button>
                <button className="w-[80px] h-[37px] rounded-3xl bg-black text-white flex justify-center items-center gap-1">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default function Test() {
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        fetch('http://3.11.159.108/blog', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setBlog(data);
            });
    }, []);

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const handleDeleteClick = () => {
        // Open the pop-up
        setIsPopUpOpen(true);
    };

    const handleClosePopUp = () => {
        // Close the pop-up
        setIsPopUpOpen(false);
    };
    return (
        <div>
            {
                blog?.map((blog) => {
                    return (

                        <div className="  bg-white container shadow-2xl rounded-2xl p-5 mb-3" key={blog.id}>
                            <div className='lg:flex gap-20 justify-between'>
                                <div className='flex flex-col w-full lg:w-1/2'>
                                    <span className="text-base font-semibold font-poppins">
                                        {blog.title}
                                    </span>
                                    <span className="text-[#2540C4] text-xs font-normal">Category:{blog.category}</span>
                                    <span className="text-sm text-gray-500 font-normal font-poppins">
                                        {blog.detail}
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
                                        <button className="w-[126px] h-[37px] rounded-3xl bg-[#20D3F3] text-white flex justify-center items-center gap-1">
                                            <span>Blocked</span>
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
                                            <div className='text-xs font-semibold'> Written by{blog.publishedby}</div>
                                            <div className='text-xs'> {blog.date}</div>
                                            <img src="/img/carehorn 12.png" alt="carehorn" className='w-20 h-auto' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className="flex gap-2 ">
                                            <div className='text-xs'>Share</div>
                                            <img src="/img/shareicon.svg" alt="icon" className="w-3 h-3" />
                                        </div>
                                        <div className='text-xs'>Blocked:Yes</div>
                                    </div>
                                </div>
                                <div className='flex gap-8 lg:gap-16 mt-3'>


                                    <button className="w-[80px] h-[37px] rounded-3xl bg-[#1560DB] text-white flex justify-center items-center gap-1">
                                        <span> Edit</span>
                                        <img src="/img/editicon.svg" alt="CMC" />
                                    </button>
                                    <button className="w-[80px] h-[37px] rounded-3xl bg-[#1560DB] text-white flex justify-center items-center gap-1">
                                        <span> View</span>
                                        <img src="/img/eyeicon.svg" alt="CMC" />
                                    </button>
                                    <div>
                                        <button
                                            className="w-[80px] h-[37px] rounded-3xl bg-[#F87575] text-white flex justify-center items-center gap-1"
                                            onClick={handleDeleteClick}
                                        >
                                            <span>Delete</span>
                                            <img src="/img/deleteicon.svg" alt="CMC" />
                                        </button>

                                        {isPopUpOpen && <PopUp onClose={handleClosePopUp} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                })}
        </div>

    )
}
