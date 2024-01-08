'use client'
import { ChangeEvent, useState } from "react";
import Image from "next/image";


export default function Page() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        setSelectedFile(file || null)
    }

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData()
            formData.append('file', selectedFile)
        } else {
            console.log('No file selected!')
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f4f1] ">
            <h1 className="text-3xl font-semibold text-center">Edit Profile</h1>
            <div className="flex flex-col m-6 w-[40%] bg-white">
                <div className="flex flex-col items-start justify-center w-full pl-5 pt-5">
                    <div className="relative border w-24 h-24 rounded-full bg-slate-300 ">
                        {selectedFile && (
                            <Image
                                src={URL.createObjectURL(selectedFile)}
                                alt="Profile image"
                                fill
                                className="rounded-full"

                            />
                        )}
                    </div>
                    <input type="file" onChange={handleFileChange} className="mt-2" />
                </div>

                <div className="w-full  mb-2 text-left p-5 ">
                    <form action="#" className="flex flex-col">
                        <div className="mt-2">
                            <p>Username</p>
                            <input
                                className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none"
                                type="text"
                                id="text"

                            />
                        </div>
                        <div className="mt-2">
                            <p>Full Name*</p>
                            <input
                                className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none"
                                type="text"
                                id="text"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <p>Email*</p>
                            <input
                                className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none"
                                type="text"
                                id="text"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <p>Phone Number*</p>
                            <input
                                className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none"
                                type="number"
                                id="text"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <p>Date of Birth</p>
                            <input
                                className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none"
                                type="number"
                                id="text"
                                required
                            />
                        </div>

                        <div className="mt-2">
                            <p>Address*</p>
                            <input
                                className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none"
                                type="text"
                                id="text"
                                required
                            />
                        </div>
                        <div className="flex items-stretch gap-3 mt-2">
                            <div className="flex-1  py-2 ">
                                <p>Role</p>
                                <input
                                    className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none"
                                    type="text"
                                    id="text"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-stretch gap-3 mt-2">
                            <div className="flex-1  py-2 ">
                                <p>Bio</p>
                                <textarea
                                    className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none"
                                    id="text"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center w-full pl-2 pt-3">
                            <span className="text-lg font-maven mb-2">Citizenship Image</span>
                            <div className="  flex items-center justify-center gap-7">
                                <div className=" ">
                                    <div className='w-72 object-contain'>
                                        <Image
                                            src="/assets/img/placeholder.png"
                                            alt='Selected'
                                            layout='responsive'
                                            width={300}
                                            height={200}
                                            className=' flex p-1 bg-slate-400 rounded-2xl  justify-center items-center'
                                        />
                                    </div>
                                    <input type="file" onChange={handleFileChange} className="mt-2" />
                                </div>
                                <div className="">
                                    <div className='w-72 object-contain'>
                                        <Image
                                            src="/assets/img/placeholder.png"
                                            alt='Selected'
                                            layout='responsive'
                                            width={300}
                                            height={200}
                                            className=' flex p-1 bg-slate-400 rounded-2xl  justify-center items-center'
                                        />
                                    </div>
                                    <input type="file" onChange={handleFileChange} className="mt-2" />
                                </div>

                            </div>
                        </div>
                        <button
                            className="w-fit bg-blue-800 text-white p-2 rounded-lg mb-4 mt-5 hover:bg-blue-500 "
                        >
                            Update Information
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
