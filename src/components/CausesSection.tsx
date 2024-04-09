import { FaBriefcaseMedical, FaHandshake, FaMonument } from 'react-icons/fa'
import { FaChildren } from 'react-icons/fa6'
import { GiBookCover } from 'react-icons/gi'
import { IoMdPaw } from 'react-icons/io'

export const CausesSection = () => {
  return (
    <div className="mb-10 pb-32">
      <div className="flex flex-col py-14">
        <h1 className="flex justify-center text-4xl font-bold text-black">
          Causes you can raises funds for
        </h1>
        <p className="flex justify-center py-4 font-semibold text-gray-400">
          social cause, personal cause - you can count on us for the project
          that you want to raise funds for.
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row  ">
        <div className="flex h-40 w-48 flex-col items-center justify-center rounded-lg border border-transparent bg-blue-500 px-6 py-4 font-semibold text-white shadow-2xl duration-300 hover:border hover:border-blue-400 hover:bg-transparent hover:text-blue-500">
          <div className="h-10 ">
            <FaBriefcaseMedical size={40} />
          </div>
          <h1>Medical</h1>
        </div>
        <div className="flex h-40 w-48 flex-col items-center justify-center rounded-lg border border-transparent bg-blue-500 px-6 py-4 font-semibold text-white shadow-2xl duration-300 hover:border hover:border-blue-400 hover:bg-transparent hover:text-blue-500">
          <FaChildren size={40} />
          <h1>Children</h1>
        </div>
        <div className="flex h-40 w-48 flex-col items-center justify-center rounded-lg  border border-transparent bg-blue-500 px-6 py-4 font-semibold text-white shadow-2xl duration-300 hover:border hover:border-blue-400 hover:bg-transparent hover:text-blue-500">
          <GiBookCover size={40} />
          <h1>Education</h1>
        </div>
        <div className="flex h-40 w-48 flex-col items-center justify-center rounded-lg  border border-transparent bg-blue-500 px-6 py-4 font-semibold text-white shadow-2xl duration-300 hover:border hover:border-blue-400 hover:bg-transparent hover:text-blue-500">
          <IoMdPaw size={40} />
          <h1>Animal</h1>
        </div>
        <div className="flex h-40 w-48 flex-col items-center justify-center rounded-lg  border border-transparent bg-blue-500 px-6 py-4 font-semibold text-white shadow-2xl duration-300 hover:border hover:border-blue-400 hover:bg-transparent hover:text-blue-500">
          <FaMonument size={40} />
          <h1>Memorial</h1>
        </div>
        <div className="flex h-40 w-48 flex-col items-center justify-center rounded-lg  border border-transparent bg-blue-500 px-6 py-4 font-semibold text-white shadow-2xl duration-300 hover:border hover:border-blue-400 hover:bg-transparent hover:text-blue-500">
          <FaHandshake size={40} />
          <h1>Others</h1>
        </div>
      </div>
    </div>
  )
}
