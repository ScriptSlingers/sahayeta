import { SearchIcon } from '@sahayeta/icons'
import { ChevronDownIcon } from '@sahayeta/icons/ChevronDownIcon'
import Image from 'next/image'

export default function LandingSection() {
    return (
        <>
            <div className='flex flex-col lg:py-16 justify-center gap-10 py-8 items-center bg-blue-700 w-full px-5'>
                <div className='lg:text-3xl text-xl font-medium text-white lg:font-bold text-center'>"Empower Change, Inspire Hope Your Contribution Makes a Difference" </div>
                <div className='lg:text-xl text-sm text-white text-center'>Sahayata Uniting Hearts, Transforming Lives – Be the Difference Today!</div>

                <div className='flex items-center rounded justify-between lg:w-1/2 bg-white'>
                    <div className='flex text-sm px-5 gap-3 justify-center items-center'>

                        <p>Category</p>
                        <div className='relative'>
                            <div className='flex items-center text-black h-5 w-5 relative'>
                                {ChevronDownIcon}
                            </div>
                        </div>
                    </div>
                    <input type='text' className='h-14 w-full outline-none px-5 border-l border-gray-600 ' placeholder='Search '
                    />

                    <div className='px-5'>
                        <div className='flex text-gray-500 w-5 h-5 items-center '>
                            {SearchIcon}
                        </div>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <div className='flex bg-slate-100/30 justify-center items-center rounded  text-white h-6 p-3'>
                        <div className='text-white w-4 h-4 flex items-center '>
                            {SearchIcon}
                        </div>
                        <p className='text-xs'>Funding</p>
                    </div>
                    <div className='flex bg-slate-100/30 justify-center items-center rounded  text-white h-6 p-3'>
                        <div className='text-white w-4 h-4 flex items-center'>
                            {SearchIcon}
                        </div>
                        <p className='text-xs'>Campaign</p>
                    </div>
                    <div className='flex bg-slate-100/30 justify-center items-center rounded  text-white h-6 p-3'>
                        <div className='text-white w-4 h-4 flex items-center'>
                            {SearchIcon}
                        </div>
                        <p className='text-xs'>Charity</p>
                    </div>
                </div>

                <div className='grid grid-cols-2 lg:grid-cols-5 gap-5 container w-full items-center justify-center'>
                    <div className='flex flex-col gap-2 items-center '>
                        <div className='h-28 w-44 p-0.5 rounded-2xl border-4 border-blue-300
'>
                            <div className="w-full h-full relative rounded-xl overflow-hidden  items-center">
                                <Image
                                    src="/assets/img/health.avif"
                                    fill
                                    alt="Testimonial"
                                    quality={100}
                                    className="object-cober"
                                />
                            </div>
                        </div>
                        <div className=' text-white  items-center flex font-medium'>Health</div>
                    </div>
                    <div className='flex flex-col gap-2 items-center '>
                        <div className='h-28 w-44 p-0.5 rounded-2xl border-4 border-blue-300
'>
                            <div className="w-full h-full relative rounded-xl overflow-hidden  items-center">
                                <Image

                                    src="/assets/img/education.jpg"
                                    fill
                                    alt="Testimonial"
                                    quality={100}
                                    className="object-cober"
                                />
                            </div>
                        </div>
                        <div className=' text-white  items-center flex font-medium'>Education
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-center '>
                        <div className='h-28 w-44 p-0.5 rounded-2xl border-4 border-blue-300
'>
                            <div className="w-full h-full relative rounded-xl overflow-hidden  items-center">
                                <Image
                                    src="/assets/img/children.jpg"
                                    fill
                                    alt="Testimonial"
                                    quality={100}
                                    className="object-cober"
                                />
                            </div>
                        </div>
                        <div className=' text-white  items-center flex font-medium'>Children
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-center '>
                        <div className='h-28 w-44 p-0.5 rounded-2xl border-4 border-blue-300
'>
                            <div className="w-full h-full relative rounded-xl overflow-hidden  items-center">
                                <Image
                                    src="/assets/img/animal.jpeg"
                                    fill
                                    alt="Testimonial"
                                    quality={100}
                                    className="object-cober"
                                />
                            </div>
                        </div>
                        <div className=' text-white  items-center flex font-medium'>Animal
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-center '>
                        <div className='h-28 w-44 p-0.5 rounded-2xl border-4 border-blue-300
'>
                            <div className="w-full h-full relative rounded-xl overflow-hidden  items-center">
                                <Image
                                    src="/assets/img/memorial.webp"
                                    fill
                                    alt="Testimonial"
                                    quality={100}
                                    className="object-cober"
                                />
                            </div>
                        </div>
                        <div className=' text-white  items-center flex font-medium'>Memorial
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-col lg:flex-row  bg-[#c7ecff] w-full  items-center justify-between gap-5 py-8 lg:px-64'>
                <p className='items-center flex font-semibold '>Harmony in Giving Sahayata, Your Bridge to Positive Change.</p>
                <div className='h-10 rounded-sm bg-[#1373eb] text-white p-3 items-center flex font-semibold'>Donate</div>
            </div>
        </>
    )
}

