'use client'
import Login from '@sahayeta/app/login/page'
import {
  NotificationIcon,
  ProfileIcon,
  QuestionIcon,
  SearchIcon
} from '@sahayeta/icons'
import { Hamburger } from '@sahayeta/icons/Hamburger'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export const AppHeader = () => {
  const session = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMenuList, setOpenMenuList] = useState<number[]>([])
  return (
    <>
      <div className="flex w-full h-16 justify-between container">
        <div className="flex">
          <div className="flex gap-5 p-6">
            <div
              className="flex h-full justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Hamburger />
            </div>
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
            <Link href="/">
              <div>Dashboard</div>
            </Link>
            <div>Donate</div>
          </div>
        </div>
        <div className="flex items-center p-6 gap-6">
          <div className="w-6 h-6">
            <Link href="#">
              <SearchIcon />
            </Link>
          </div>
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
          {/* {JSON.stringify(session)} */}
          {session.data ? (
            <div className="flex gap-3">
              <Link href="/profile">
                <div className="relative rounded-full overflow-hidden hover:cursor-pointer">
                  <Image
                    src={session?.data?.user?.image || ''}
                    alt={session?.data?.user?.name || ''}
                    height={40}
                    width={50}
                  />
                </div>
              </Link>
              <button
                className=" bg-purple-500 text-white hover:bg-purple-700 p-3 rounded font-bold "
                onClick={() => signOut()}
              >
                Signout
              </button>
            </div>
          ) : (
            <div className="w-6 h-6">
              <button>
                <Link
                  href="/login"
                  className=" bg-purple-500 text-white hover:bg-purple-700 p-3 rounded font-bold "
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
