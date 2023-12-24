import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsFacebook, BsLinkedin, BsTwitterX } from 'react-icons/bs';
import RecentBlogs from '../../components/blog/RecentBlogs';
import { AuthAPI } from '../../src/api';
import { format } from 'date-fns';


export default function BlogDetails() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        AuthAPI
            .get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/`)
            .then((res) => {
                setBlogs(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div>
            {blogs.map((blog) => (
                <div className='flex flex-col justify-center  p-5 gap-4 m-4' key={blog.id}>
                    <div className='text-4xl font-bold flex justify-center text-black w-50%'>{blog.title}</div>


                    <div className='flex flex-col justify-center items-center px-14'>
                        <div className='flex  gap-2' >
                            <div className='w-12 h-12 rounded-3xl overflow-hidden'>
                                <div className='w-100% h-100% objectfit-cover rounded-3xl'>
                                    <img src="/img/profile1.jpg" alt="doc image" /></div>
                            </div>
                            <div>
                                <div className='text-base font-bold'>Written by <Link href='#'>{blog.publishedby}</Link> </div>
                                <div className='text-xs'> {format(new Date(blog.date), 'yyyy-MM-dd')}, 5 min read</div>
                            </div>

                        </div>

                        <div className='text-lg font-medium'>{blog.category}</div>
                    </div>
                    <div className='rounded flex justify-center items-center '>
                        <Image
                            src='/img/1.avif'
                            alt='My Image'
                            width='1100px'
                            height='500px'
                            className='rounded'

                        />
                    </div>
                    <div className='flex gap-5 '>
                        <div className='flex w-3/4 flex-col px-20  '>
                            <span className='text-base font-normal'>{blog.detail} </span>
                            <span className='text-lg font-bold'>What is body dysmorphia?</span>
                            <span className='text-base font-normal'>While many of us are prone to thinking a little too much about certain flaws or blemishes on our bodies, for those living with body dysmorphic disorder (BDD) , these negative thoughts are overwhelming and cause significant distress.

                                With the right diagnosis and treatment, it is possible to manage body dysmorphic disorder and make daily life easier. With that in mind, let’s take a look at everything you need to know about diagnosing and treating body dysmorphia. </span>
                            <span className='text-lg font-bold'>What causes body dysmorphic disorder?</span>
                            <span className='text-base font-normal'>While many of us are prone to thinking a little too much about certain flaws or blemishes on our bodies, for those living with body dysmorphic disorder (BDD) , these negative thoughts are overwhelming and cause significant distress.

                                With the right diagnosis and treatment, it is possible to manage body dysmorphic disorder and make daily life easier. With that in mind, lets take a look at everything you need to know about diagnosing and treating body dysmorphia.</span>
                            <ul className='text-base font-normal'>
                                <li>
                                    Lorem ipsum dolor sit amet
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet
                                </li>
                            </ul>
                            <span className='text-lg font-bold'>What causes body dysmorphic disorder?</span>
                            <span className='text-base font-normal'>While many of us are prone to thinking a little too much about certain flaws or blemishes on our bodies, for those living with body dysmorphic disorder (BDD) , these negative thoughts are overwhelming and cause significant distress.

                                With the right diagnosis and treatment, it is possible to manage body dysmorphic disorder and make daily life easier. With that in mind, let’s take a look at everything you need to know about diagnosing and treating body dysmorphia. </span>
                            <ul className='text-base font-normal'>
                                <li>
                                    Lorem ipsum dolor sit amet
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet
                                </li>
                            </ul>

                        </div>

                        <div className='flex flex-col gap-2 shadow-md rounded p-5'>

                            <span className="text-base font-medium font-poppins">SHARE</span>

                            <div className='flex gap-3'>
                                <BsFacebook className='p-2 w-10 h-10 hover:shadow-md hover:rounded hover:bg-slate-50 text-black' />
                                <BsTwitterX className='p-2 w-10 h-10 hover:shadow-md hover:rounded hover:bg-slate-50 text-black' />
                                <BsLinkedin className='p-2 w-10 h-10 hover:shadow-md hover:rounded hover:bg-slate-50 text-black' />
                            </div>
                            <span className="text-base font-bold font-poppins">Recent Articles</span>
                            <RecentBlogs />
                        </div>
                    </div>

                </div>

            ))}


        </div >


    )
}
