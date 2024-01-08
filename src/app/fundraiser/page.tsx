import React from 'react'
import { TbAddressBook } from 'react-icons/tb'
import { FaHeart } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'

export default function page() {
  return (
    <div className="bg-blue-50 rounded w-full  flex flex-col p-6 justify-center items-center">
      <div className="container ">
        <div className="bg-slate-200 flex flex-col w-full py-5 rounded-xl  ">
          <div className="relative px-10 sm:rounded-lg">
            <p className="text-lg font-bold py-4 text-blue-700">
              User Information
            </p>
          </div>
          <div className="m-3">
            <div className="  flex items-center gap-3 rounded-md bg-gray-50 border mb-3">
              <div className="w-24 h-24 border border-accent m-3 bg-slate-300 rounded-full"></div>
              <div className=" rounded-md p-2">
                <p className="font-medium text-xl">Aanchal Subedi</p>
                <p className="text-slate-500 font-maven text-md  flex ">
                  <TbAddressBook className="m-1" />
                  Bharatpur, Chitwan
                </p>
                <p className="text-slate-500 font-maven text-md  flex ">
                  <FaHeart className="m-1" />
                  Fundraiser for 7 months
                </p>
              </div>
            </div>
            <div className="w-full">
              <div className="p-4">
                <h6 className="font-semibold text-lg flex">
                  <FaCalendarAlt className="m-2 text-lg" />
                  Donation Information
                </h6>
              </div>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-2">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Campaign Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Goal Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Raised Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className=" border-b hover:bg-gray-50 ">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    jajarkot
                  </td>
                  <td className="px-6 py-4">education</td>
                  <td className="px-6 py-4">2023-05-21</td>

                  <td className="px-6 py-4">25000</td>
                  <td className="px-6 py-4">22000</td>
                  <td className="px-6 py-4">2023-05-23</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
