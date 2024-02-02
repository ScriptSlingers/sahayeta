'use client'
import React from 'react'

export default function ChangePassword() {
  return (
    <div className="flex w-full flex-col  items-center justify-center rounded bg-blue-50">
      <div className="container flex items-center justify-center ">
        <div className="flex w-full flex-col items-center justify-center rounded-xl bg-slate-200 py-5  ">
          <div className="m-5 flex flex-col justify-center rounded-xl bg-white p-8">
            <span className="mb-3 text-4xl font-bold">
              Change your Password
            </span>
            <span className="mb-8 font-light text-gray-400">
              Enter your new password below to change your password
            </span>
            <form action="#" className="flex flex-col">
              <div className="mt-2 ">
                <p>Current Password</p>
                <input
                  className="w-full rounded-lg border border-slate-500 p-2 text-sm text-black outline-none"
                  type="text"
                  id="text"
                  placeholder="Current password"
                  required
                />
              </div>
              <div className="mt-2 ">
                <p>New Password</p>
                <input
                  className="w-full rounded-lg border border-slate-500 p-2 text-sm text-black outline-none"
                  type="text"
                  id="text"
                  placeholder="New password"
                  required
                />
              </div>
              <div className="mt-2">
                <p>Confirm Password</p>
                <input
                  className="w-full rounded-lg border border-slate-500 p-2 text-sm text-black outline-none"
                  type="text"
                  id="text"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="flex w-full justify-between py-3">
                <button className="mb-2 mt-2 w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-400 ">
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
