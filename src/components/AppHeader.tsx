'use client'
import { NotificationIcon, QuestionIcon } from '@sahayeta/icons'
import { useClientSession } from '@sahayeta/utils'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { BsBell } from 'react-icons/bs'
import { FaCircleNotch } from 'react-icons/fa'

export const AppHeader = () => {
  const session = useClientSession()
  return (
    <div className="shadow">
      <div className="flex w-full h-16 justify-between container">
        <div className="flex">
          <div className="flex gap-5 p-6">
            <div className="flex items-center">
              <div className="relative h-16 w-24 items-center">
                <Link href="/">
                  <Image
                    src="/assets/img/logo.png"
                    alt="logo"
                    fill
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>
            <div className="border-r border-slate-700"></div>
          </div>
          <div className="hidden md:flex gap-6 items-center p-6 text-base font-medium">
            <Link href="/">
              <div>Home</div>
            </Link>
            {session?.role === 'admin' && (
              <Link href="/dashboard">
                <div>Dashboard</div>
              </Link>
            )}
            <Link href="/campaigns">
              <div>Campaign</div>
            </Link>
            <div>Charity</div>
            <div>Donate</div>
          </div>
        </div>
        <div className="flex items-center p-6 gap-6">
          <div className="flex justify-center items-center p-3 border-2 border-blue-700 text-blue-700 hover:text-white hover:bg-blue-700 rounded-full ">
            <Link href="#">
              <BsBell />
            </Link>
          </div>
          {session ? (
            <div className="flex gap-3">
              <Link href="/profile">
                <div className="relative rounded-full h-12 w-12 overflow-hidden hover:cursor-pointer">
                  <Image
                    src={session?.image || ''}
                    alt={session?.name || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </Link>
              <button
                className=" items-center text-white bg-blue-600 rounded p-3  font-medium inline-block hover:bg-transparent hover:border-blue-400 hover:text-black duration-300 hover:border border border-transparent d "
                onClick={() => signOut()}
              >
                Signout
              </button>
            </div>
          ) : session === null ? (
            <FaCircleNotch />
          ) : (
            <div className="w-10 h-4 mx-2 flex justify-center items-center">
              <button>
                <Link
                  href="/login"
                  className=" items-center text-white bg-blue-600 rounded p-2  font-medium inline-block hover:bg-transparent hover:border-blue-400 hover:text-black duration-300 hover:border border border-transparent "
                >
                  Login
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
