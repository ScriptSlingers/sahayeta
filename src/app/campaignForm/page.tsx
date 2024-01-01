'use client'

import Image from "next/image"

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f9f4f1] ">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
                <section className="flex flex-col justify-center items-center p-8 md:p-14">
                    <span className="mb-3 text-4xl font-bold">
                        Complete this form before initiating the campaign.
                    </span>
                    <span className="font-medium text-red-600 mt-2">
                        All fields must be filled out.
                    </span>
                    <form action="#" className="flex flex-col">
                        <div className="mt-2 ">
                            <p>Full Name</p>
                            <input
                                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                                type="text"
                                id="text"
                                placeholder="Enter Your Full Name"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <p>Dtae of Birth</p>
                            <input
                                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                                type="text"
                                id="text"
                                placeholder="Enter Your Date Of Birth"
                                required
                            />
                        </div>
                        <div>
                            <div className="mt-2">
                                <p>Citizenship Number</p>
                                <input
                                    className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                                    type="text"
                                    id="text"
                                    placeholder="Enter your Citizenship Number"
                                    required
                                />
                            </div>
                            <div className="mt-2">
                                <p>National Identity Number</p>
                                <input
                                    className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                                    type="text"
                                    id="text"
                                    placeholder="Enter your National Identity Number"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <p>Phone Number</p>
                            <input
                                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                                type="text"
                                id="text"
                                placeholder="Enter Your Phone Number"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <p>Full Address</p>
                            <input
                                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                                type="text"
                                id="text"
                                placeholder="Enter Your full Address"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <p>Gender</p>
                            <input
                                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                                type="text"
                                id="text"
                                placeholder="Enter Your Gender"
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <p>Bio</p>
                            <textarea
                                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                                id="text"
                                placeholder="Enter Your Bio"
                                required
                            ></textarea>
                        </div>

                        <div className="flex flex-col gap-3 mt-2">
                            <p>Upload The Photo of Citizenship</p>
                            <div className="flex ">
                                <div className='w-96 object-contain flex flex-col justify-center items-center'>
                                    <Image
                                        src="/assets/img/placeholder.png"
                                        alt='Selected'
                                        layout='responsive'
                                        width={300}
                                        height={200}
                                        className=' flex p-1  rounded-2xl  justify-center items-center'
                                    />
                                    <span className="">
                                        Front side of Citizenship
                                    </span>
                                </div>
                                <div className='w-96 object-contain flex flex-col justify-center items-center'>
                                    <Image
                                        src="/assets/img/placeholder.png"
                                        alt='Selected'
                                        layout='responsive'
                                        width={300}
                                        height={200}
                                        className=' flex p-1  rounded-2xl  justify-center items-center'
                                    />
                                    <span className="">
                                        Back side of Citizenship
                                    </span>
                                </div>
                            </div>
                        </div>


                        <div className="flex w-full py-3">
                            <button className="w-48 bg-blue-600 text-white p-2 rounded-lg mb-2 mt-2 hover:bg-blue-400 ">
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div >
    )
}
