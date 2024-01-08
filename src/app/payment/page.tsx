import React from 'react'
export default function Payments() {
  return (
    <>
      <div className="">
        <div className="container mx-auto mt-8">
          <form className="max-w-md mx-auto p-8 bg-white shadow-lg rounded">
            <h2 className="text-xl font-semibold mb-6 text-blue-500">
              Donor Information
            </h2>
            <div className="flex flex-row gap-4">
              <div className="mb-4">
                <label
                  htmlFor="firstname"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name"
                  type="text"
                  placeholder="first name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastname"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="last-name"
                  type="text"
                  placeholder="last name"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="emailaddress"
                className=" block text-gray-700 text-sm font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="email-address"
                placeholder="email address"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phonenumber"
                className=" block text-gray-700 text-sm font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="phone number"
                placeholder="phone number"
                required
              />
            </div>
            <div className="">
              <div className="flex flex-row gap-28">
                <h2 className="text-xl font-semibold mb-6 text-blue-500">
                  Payment Method
                </h2>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="phone number"
                placeholder="khalti phone number"
                required
              />
            </div>
            <div className="md:flex py-4">
              <a
                href="#"
                className="rounded w-full py-2 px-3 text-center font-semibold bg-blue-500 text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-transparent hover:border-blue-400 hover:text-blue-500 duration-500 hover:border border border-transparent"
              >
                Donate with khalti
              </a>
            </div>
            <div className="flex flex-row gap-2">
              <input type="checkbox" id="checkbox" />
              <p className=" text-blue-500 text-sm">
                Don't display my name publicly on the fundraiser.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
