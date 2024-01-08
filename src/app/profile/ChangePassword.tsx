'use client'
import React from 'react'

export default function ChangePassword() {
  return (
    <div className="bg-blue-50 rounded w-full  flex flex-col p-6 justify-center items-center">
      <div className="container flex items-center justify-center ">
        <div className="bg-slate-200 flex flex-col w-full py-5 items-center justify-center rounded-xl  ">
          <div className="flex flex-col justify-center p-8 m-5 bg-white rounded-xl">
            <span className="mb-3 text-4xl font-bold">
              Change your Password
            </span>
            <span className="font-light text-gray-400 mb-8">
              Enter your new password below to change your password
            </span>
            <form action="#" className="flex flex-col">
              <div className="mt-2 ">
                <p>Current Password</p>
                <input
                  className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                  type="text"
                  id="text"
                  placeholder="Current password"
                  required
                />
              </div>
              <div className="mt-2 ">
                <p>New Password</p>
                <input
                  className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                  type="text"
                  id="text"
                  placeholder="New password"
                  required
                />
              </div>
              <div className="mt-2">
                <p>Confirm Password</p>
                <input
                  className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm outline-none"
                  type="text"
                  id="text"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="flex justify-between w-full py-3">
                <button className="w-full bg-blue-600 text-white p-2 rounded-lg mb-2 mt-2 hover:bg-blue-400 ">
                  CHANGE PASSWORD
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
