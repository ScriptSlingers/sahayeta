import { TbAddressBook, } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";



const data = [
    { name: 'street children', location: "bharatpur", category: "education", date: 19 - 3 - 2021, amount: 2500, status: "completed" },
    { name: 'street children', location: "bharatpur", category: "education", date: 19 - 3 - 2021, amount: 2500, status: "completed" },
    { name: 'street children', location: "bharatpur", category: "education", date: 19 - 3 - 2021, amount: 2500, status: "completed" },
    { name: 'street children', location: "bharatpur", category: "education", date: 19 - 3 - 2021, amount: 2500, status: "completed" }

]

export default function Donation() {
    return (
        <>
        <div className="flex items-center justify-center bg-[#f9f4f1] ">
            <div className='w-[40%] min-h-screen border bg-white'>
                <section className=' border-b-1'>
                    <div className="  flex items-center gap-3 ">
                        <div className="w-24 h-24 border border-accent m-3 bg-slate-300 rounded-full">

                        </div>
                        <div className=" rounded-md p-2">
                            <p className='font-medium text-xl'>Sophia Browe</p>
                            <p className='text-slate-500 font-maven text-md  flex '><TbAddressBook className='m-1' />Bharatpur, Chitwan</p>
                            <p className='text-slate-500 font-maven text-md  flex '><FaHeart className='m-1' />Donor for 7 months</p>
                        </div>
                    </div>
    </section>
                <section className='w-full'>
                <div className='m-2 p-2'>
                        <h6 className='font-semibold text-lg  flex'><FaCalendarAlt className='m-2 text-lg' />Donation Information</h6>
                    </div>
                    <div className=' flex items-center justify-around p-4'>
                        <div className='bg-blue-500 text-white w-fit flex flex-col items-start justify-center p-7 border rounded-xl'>
                            <span className=' text-xl font-maven pb-2'>Latest Donation</span>
                            <span className='text-lg font-maven'>Npr. 2500</span>
                        </div>
                        <div className='bg-blue-500 text-white w-fit flex flex-col items-start justify-center p-7 border rounded-xl'>
                            <span className='text-xl font-maven pb-2'>Total Donation</span>
                            <span className='text-lg font-maven'>Npr. 25000</span>
                        </div>
                        <div className='bg-blue-500 text-white w-fit flex flex-col items-start justify-center p-7 border rounded-xl'>
                            <span className='text-xl font-maven pb-2'>Total  Donation</span>
                            <span className='text-lg font-maven'>5</span>
                        </div>

                    </div>
                    
                </section>
                <section className='text-black mx-4'>
                    <div className='my-2 p-1'>
                        <h6 className='font-semibold text-lg  flex'><FaCalendarAlt className='m-2 text-lg' />Donation History</h6>
                    </div>
                    <div className=" bg-white rounded-bl-lg rounded-br-lg border border-t-slate-300 ">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Campaign Name</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Location</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Category</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Date</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Amount</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Status</th>
                                </tr>
                            </thead>
                            {data.map((val, key) => {
                                return (
                                    <tbody className="bg-white">
                                        <tr key={key}>
                                            <td className='px-6 py-3 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5 '>{val.name}</td>
                                            <td className='px-6 py-3 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5'>{val.location}</td>
                                            <td className='px-6 py-3 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5'>{val.category}</td>
                                            <td className='px-6 py-3 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5'>{val.date}</td>
                                            <td className='px-6 py-3 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5'>{val.amount}</td>
                                            <td className='px-6 py-3 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5'>{val.status}</td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                </section>
            </div>
            </div>
        </>
    )
}
