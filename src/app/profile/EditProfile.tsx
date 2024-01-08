'use client'
import React, { ChangeEvent, useEffect, useState }  from 'react'
import axios from 'axios'
import Image from 'next/image';
import { useClientSession } from '@sahayeta/utils';
import { TbAddressBook, } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

type loggedInUser = { 
    id: string 
    name: string 
    orgName: string 
    profileImage: string 
    email: string 
    role: string 
    bio: string 
    phoneNum: string 
    address: string 
    dob: string 
    ctzImg: string 
    balance: string 
} 
 

export default function EditProfile() {

   


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

  
    const currentUser = useClientSession(); 
    const [loggedInUser, setLoggedInUser] = useState<loggedInUser | null>(null); 

    useEffect(() => { 
        const fetchData = async () => { 
            try { 
                if (currentUser?.id) { 
                    const response = await axios.get(`/api/users/${currentUser.id}`); 
                    const res = response.data; 
                    setLoggedInUser(res); 
                } 
            } catch (error) { 
                console.error('Error fetching user data:', error); 
            } 
        }; 
 
        fetchData(); 
    }, [currentUser?.id]); 
    return (
      
        <div className="bg-blue-50 rounded w-full  flex flex-col p-6 justify-center items-center">
            <div className="container flex items-center justify-center ">
                <div className="bg-slate-200 flex flex-col w-full py-5 rounded-xl  ">
                    <div className="relative px-10 sm:rounded-lg">
                        <p className="text-lg font-bold py-4 text-blue-700">User Information</p>
                    </div>
                    <div className='m-3'>
                        <div className="  flex items-center gap-3 rounded-md bg-gray-50 border mb-3 mx-5">
                            <div className="relative w-24 h-24 border border-accent m-3 bg-slate-300 rounded-full">
                            <Image
                                 src={loggedInUser?.profileImage || ""}
                                alt="Profile image"
                                fill
                                className="rounded-full"

                            />
                            </div>
                            <div className=" rounded-md p-2">
                                <p className='font-medium text-xl'>{loggedInUser?.name}</p>
                                <p className='text-slate-500 font-maven text-md  flex '><TbAddressBook className='m-1' />{loggedInUser?.email}</p>
                                <p className='text-slate-500 font-maven text-md  flex '><FaHeart className='m-1' />{loggedInUser?.role}</p>
                            </div>
                        </div>
                       
                        <div className='w-full'>
                            <div className='p-4'>
                                <h6 className='font-semibold text-lg flex'><FaCalendarAlt className='m-2 text-lg' />Edit Information</h6>
                            </div>
                        </div>
                        <div className="w-full  mb-2 text-left p-5 ">
                    <form action="#" className="flex flex-col" >
                        <div className="mt-2">
                            <p>Phone Number*</p>
                            <input
                                className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none bg-gray-50"
                                type="number"
                                name='phoneNum'
                                id="text"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <p>Date of Birth</p>
                            <input
                                className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none bg-gray-50"
                                type="date"
                                name='dob'
                                id="text"
                                required
                            />
                        </div>

                        <div className="mt-2">
                            <p>Address*</p>
                            <input
                                className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none bg-gray-50"
                                type="text"
                                id="text"
                                name='address'
                                required
                            />
                        </div>
                        <div className="flex items-stretch gap-3 mt-2">
                            <div className="flex-1  py-2 ">
                                <p>Role</p>
                                <input
                                    className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none bg-gray-50"
                                    type="text"
                                    id="text"
                                    name='role'
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-stretch gap-3 mt-2">
                            <div className="flex-1  py-2 ">
                                <p>Bio</p>
                                <textarea
                                    className="w-full border border-slate-400 p-2 rounded-lg text-black text-sm outline-none bg-gray-50"
                                    id="text"
                                    name='bio'
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center w-full pl-2 pt-3">
                            <span className="text-lg font-maven mb-2">Citizenship Image</span>
                            <div className="  flex items-center justify-center gap-7">
                                <div className=" ">
                                    <div className='w-72 h-52 relative border bg-slate-300 rounded-md'>
                                    {selectedFile && (
                            <Image
                                src={URL.createObjectURL(selectedFile)}
                                alt="Citizenship image"
                                fill
                                className=""

                            />
                        )}
                                    </div>
                                    <input type="file" name="ctzImg" onChange={handleFileChange} className="mt-2" />
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
            </div>
        </div>
    )
}
