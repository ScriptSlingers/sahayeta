
import { format } from "date-fns";
import Image from 'next/image';
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';

export default function RecentBlogs() {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('http://3.11.159.108/blog', {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
            });
    }, []);
    const recentBlogs = blogs.slice(0, 3);

    return (
        <div className="flex flex-col gap-8" >
            {
                recentBlogs?.map((blog) => {
                    return (
                        <div className='flex flex-col gap cursor-pointer' key={blog?._id} onClick={() => router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${blog.category}/${blog._id}`)} >
                            <Image
                                src='/img/5.avif'
                                alt='My Image'
                                width='400px'
                                height='200px'
                                className='rounded-xl '
                            />
                            <span className="text-lg font-poppins font-medium text-[#2540C4]">{blog?.title}</span>
                            <span className="text-base font-poppins text-gray-500"> Posted on {format(new Date(blog?.date), 'yyyy-MM-dd')} by {blog.publishedby} </span>
                        </div>
                    );
                })
            }
        </div >


    )
}