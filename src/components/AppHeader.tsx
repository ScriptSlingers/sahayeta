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
      <div className="container flex h-16 w-full justify-between">
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
          <div className="hidden items-center gap-6 p-6 text-base font-medium md:flex">
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

          </div>
        </div>
        <div className="flex items-center gap-6 p-6">
          <div className="flex items-center justify-center rounded-full border-2 border-blue-700 p-3 text-blue-700 hover:bg-blue-700 hover:text-white ">
            <Link href="#">
              <BsBell />
            </Link>
          </div>
          {session ? (
            <div className="flex gap-3">
              <Link href="/profile">
                <div className="relative h-12 w-12 overflow-hidden rounded-full hover:cursor-pointer">
                  <Image
                    src={session?.image || '/assets/img/avatar.jpg'}
                    alt={session?.name || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </Link>
              <button
                className=" d inline-block items-center rounded border  border-transparent bg-blue-600 p-3 font-medium text-white duration-300 hover:border hover:border-blue-400 hover:bg-transparent hover:text-black "
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          ) : session === null ? (
            <FaCircleNotch />
          ) : (
            <div className="mx-2 flex h-4 w-10 items-center justify-center">
              <button>
                <Link
                  href="/login"
                  className=" inline-block items-center rounded border border-transparent  bg-blue-600 p-2 font-medium text-white duration-300 hover:border hover:border-blue-400 hover:bg-transparent hover:text-black "
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
