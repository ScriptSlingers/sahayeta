import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function FrontCard() {
    return (
        <div>
            <Link href='./detailscard'>
                <div className='flex flex-col bg-blue-50 p-5 w-96 h-96 shadow-2xl gap-5'>
                    <div className="relative flex h-48 ">
                        <Link href="/">
                            <Image
                                src="/assets/img/card.jpg"
                                alt="logo"
                                fill
                                className="object-cover rounded"
                            />
                        </Link>
                    </div>
                    <div className='text-xl font-semibold'>Lorem ipsum dolor sit amet</div>
                    <div className="text-gray-500 flex justify-center align-middle ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
                    </div>
                    <div className='flex justify-between font-medium'>
                        <div className="">NRP 50,000 Raised</div>
                        <p className="">NRP 50 Donations</p>
                    </div>
                </div>
            </Link >
        </div >
    )
}
