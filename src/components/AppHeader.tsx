'use client'
import { Hamburger, NotificationIcon, QuestionIcon } from '@sahayeta/icons'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaCircleNotch } from 'react-icons/fa'

export const AppHeader = () => {
  const session = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
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
            <Link href="">
              <div>Dashboard</div>
            </Link>
            <div>Campaign</div>
            <div>Charity</div>
            <div>Donate</div>
          </div>
        </div>
        <div className="flex items-center p-6 gap-6">
          <div className="w-6 h-6">
            <Link href="#">
              <NotificationIcon />
            </Link>
          </div>
          <div className="w-6 h-6">
            <Link href="#">
              <QuestionIcon />
            </Link>
          </div>
          {session.data ? (
            <div className="flex gap-3">
              <Link href="/profile">
                <div className="relative rounded-full overflow-hidden hover:cursor-pointer">
                  <Image
                    src="/assets/img/donateicon.png"
                    alt={session?.data?.user?.name || ''}
                    height={40}
                    width={50}
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
          ) : session?.status == 'loading' ? (
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
    </>
  )
}
