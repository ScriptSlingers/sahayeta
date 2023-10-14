'use client'
import {
  NotificationIcon,
  ProfileIcon,
  QuestionIcon,
  SearchIcon
} from '@sahayeta/icons'
import { Hamburger } from '@sahayeta/icons/Hamburger'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
export default function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMenuList, setOpenMenuList] = useState<number[]>([])
  return (
    <>
      {/* first section */}
      <div className="flex w-full h-16">
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
        {/* second section */}
        <div className="hidden md:flex gap-6 items-center p-6 text-base font-medium">
          <Link href="/">
            {' '}
            <div>link1</div>{' '}
          </Link>
          <Link href="/">
            {' '}
            <div>link2</div>{' '}
          </Link>
          <div>submenu</div>
        </div>
        {/* last section */}
        <div className="flex items-center p-6 gap-6 ml-auto">
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

          <div className="w-6 h-6">
            <Link href="#">
              <ProfileIcon />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
