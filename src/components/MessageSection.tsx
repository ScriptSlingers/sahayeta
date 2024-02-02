import Image from 'next/image'
import React from 'react'

// export const MessageSection = () => {
//     return (
//         <div className="flex flex-row items-center mr-14">
//             <div className="">
//                 <div className="flex flex-col py-14">
//                     <h1 className="flex text-black font-bold text-xl px-28 ">
//                         Fundraise for anyone
//                     </h1>
//                 </div>
//                 <div className="flex flex-col px-28 ">
//                     <h1 className="text-blue-500 font-bold text-2xl">Yourself</h1>
//                     <p className=" text-gray-500 text-xl py-8 ">
//                         Funds are delivered to your bank account for your own use
//                     </p>
//                 </div>
//                 <div className="flex flex-col px-28 py-14">
//                     <h1 className="text-blue-500 font-bold text-2xl">
//                         Family and friends
//                     </h1>
//                     <p className=" text-gray-500 text-xl py-8 ">
//                         Funds can be distributed and received
//                     </p>
//                 </div>
//                 <div className="flex flex-col px-28 ">
//                     <h1 className="text-blue-500 font-bold text-2xl">Charity</h1>
//                     <p className=" text-gray-500 text-xl py-8 ">
//                         Funds are delivered to your chosen nonprofit for you
//                     </p>
//                 </div>
//             </div>
//             <div className="">
//                 <Image
//                     src="/assets/img/plant.jpg"
//                     alt="Hero Section"
//                     width={550}
//                     height={100}
//                     className="shadow-2xl rounded"
//                     quality={100}
//                 />
//             </div>
//         </div>
//     )
// }
export const MessageSection = () => {
  return (
    <div className="mr-14 flex flex-row items-center">
      <div className="">
        <div className="flex flex-col py-14">
          <h1 className="flex px-28 text-xl font-bold text-black ">
            Fundraise for anyone
          </h1>
        </div>
        <div className="flex flex-col px-28 ">
          <h1 className="text-2xl font-bold text-blue-500">Yourself</h1>
          <p className=" py-8 text-xl text-gray-500 ">
            Funds are delivered to your bank account for your own use
          </p>
        </div>
        <div className="flex flex-col px-28 py-14">
          <h1 className="text-2xl font-bold text-blue-500">
            Family and friends
          </h1>
          <p className=" py-8 text-xl text-gray-500 ">
            Funds can be distributed and received
          </p>
        </div>
        <div className="flex flex-col px-28 ">
          <h1 className="text-2xl font-bold text-blue-500">Charity</h1>
          <p className=" py-8 text-xl text-gray-500 ">
            Funds are delivered to your chosen nonprofit for you
          </p>
        </div>
      </div>
      <div className="">
        <Image
          src="/assets/img/plant.jpg"
          alt="Hero Section"
          width={550}
          height={100}
          className="rounded shadow-2xl"
          quality={100}
        />
      </div>
    </div>
  )
}
