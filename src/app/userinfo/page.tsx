import React from 'react'
import { TbAddressBook } from 'react-icons/tb'
import { FaHeart } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineRise } from 'react-icons/ai'
import { BsCurrencyDollar } from 'react-icons/bs'


const data = [
  {
    donation: 25.0,
    form: 'Donation Form',
    date: 19- 3 - 2021,
    status: 'Completed'
  },
  {
    donation: 25.0,
    form: 'Donation Form',
    date: 19 - 3 - 2021,
    status: 'Completed'
  },
  {
    donation: 25.0,
    form: 'Donation Form',
    date: 19 - 3 - 2021,
    status: 'Completed'
  },
  {
    donation: 25.0,
    form: 'Donation Form',
    date: 19 - 3 - 2021,
    status: 'Completed'
  }
]

export default function Userinfo() {
  return (
    <>
     <div className='grid item-center justify-center my-5 bg-[#f9f4f1] '>
      <div className='border-2 border-slate-500 bg-white'>
      <section className="border-b-2 border-slate-500">
        <div className="flex items-center gap-3 ">
          <div className="w-20 h-20 border border-accent m-3 bg-slate-300 rounded-full"></div>
          <div className=" rounded-md ">
            <p className="font-bold text-base text-blue-600">Sophia Browe</p>
            <p className="text-black font-maven text-sm  flex ">
              <TbAddressBook className="m-1" />
              Bharatpur, Chitwan
            </p>
            <p className="text-black font-maven text-sm  flex ">
              <FaHeart className="m-1" />
              Donor for 7 months
            </p>
          </div>
        </div>
      </section>
      <div className="flex">
        <section className="w-0.5/3  border-r-2 border-slate-500 ">
          <div className=" text-black flex flex-col items-start justify-center p-4 gap-3 ">
            <div className="text-md font-md font-maven  text-center flex gap-3 cursor-pointer">
              <FaHome className="" /> Dashboard
            </div>
            <div className="text-md font-md font-maven  text-center flex gap-3 cursor-pointer">
              <FaCalendarAlt className="" /> History
            </div>
            <div className="text-md font-md font-maven  text-center flex gap-3 cursor-pointer">
              <CgProfile className="" /> Edit Profile
            </div>
          </div>
        </section>
        <section className="w-2.5/3 text-black p-3 flex flex-col items-start justify-center">
          <div className="">
            <h6 className=" font-md text-lg flex">
              <AiOutlineRise className="m-2 text-lg" />
              Your Giving Status
            </h6>
          </div>
          <div className="p-5 flex items-center justify-start w-full">
            <div className="bg-gray-100 border-1 border-slate-500 flex gap-4 items-center justify-around p-3">
              <div className="border-1 border-slate-400 bg-white text-center w-24 h-24 p-2">
                <p className="text-blue-700 text-base">4</p>
                <p className="text-sm font-maven">NUMBER OF DONATION</p>
              </div>
              <div className="border-1 border-slate-400 bg-white text-center w-24 h-24 p-2">
                <p className="text-blue-700 text-base">17K</p>
                <p className="text-sm font-maven">LIFETIME DONATIONS</p>
              </div>
              <div className="border-1 border-slate-400 bg-white text-center w-24 h-24 p-2">
                <p className="text-blue-700 text-base">2.5K</p>
                <p className="text-sm font-maven">AVERAGE DONATION</p>
              </div>
              
            </div>
          </div>
          <div className="">
            <h6 className="font-md text-lg flex">
              <FaCalendarAlt className="m-2 text-md" />
              Recent Donations
            </h6>
          </div>
          <div className=" flex items-center justify-start m-5 ">
            <table className="table-auto w-full ">
              <thead>
              <tr className="bg-slate-200 text-center">
                <th className="w-1/4 min-w-12 text-lg font-semibold text-black py-1 lg:py-1 px-3 lg:px-3 border-1 border-slate-500">
                  DONATION
                </th>
                <th className="w-1/4 min-w-12 text-lg font-semibold text-black py-1 lg:py-1 px-3 lg:px-3 border-1 border-slate-500">FORM</th>
                <th className="w-1/4 min-w-12 text-lg font-semibold text-black py-1 lg:py-1 px-3 lg:px-3 border-1 border-slate-500">DATE</th>
                <th className="w-1/4 min-w-12 text-lg font-semibold text-black py-1 lg:py-1 px-3 lg:px-3 border-1 border-slate-500">STATUS</th>
              </tr>
              </thead>
              <tbody>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td className="text-center text-base font-md py-3 px-2 border-b border-1 border-black">
                      {val.donation}
                    </td>
                    <td className="text-center text-base font-md py-3 px-2 border-b border-1 border-black">
                      {val.form}
                    </td>
                    <td className="text-center text-base font-md py-3 px-2 border-b border-1 border-black">
                      {val.date}
                    </td>
                    <td className="text-center text-base font-md py-3 px-2 border-b border-1 border-black">
                      {val.status}
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      </div>
      </div>
    </>
  )
}
