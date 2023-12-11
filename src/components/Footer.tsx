'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from './Typography'
import { ScrollToTopButton } from './ScrollToTop'
import {
  CallIcon,
  EnvelopeIcon,
  FacebookIcon,
  InstagramIcon
} from '@sahayeta/icons'

export const Footer = () => {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <div className="flex w-full justify-center bg-[#c7ecff]">
          <div className="flex flex-col">
            <div className="min-h-96 container grid grid-cols-1 items-center gap-x-9 gap-y-12 py-14 lg:grid-cols-4">
              <div className="flex h-full flex-col items-center justify-center gap-4 border-r-1 lg:items-start lg:border-black">
                <Link
                  className="group flex items-center gap-3"
                  href="#"
                  target="_blank"
                >
                  <div className="flex h-6 w-6 text-blue-700">
                    <InstagramIcon />
                  </div>
                  <Typography className="group-hover:text-blue-700">
                    /Sahayata
                  </Typography>
                </Link>
                <Link
                  className="group flex items-center gap-3"
                  href="#"
                  target="_blank"
                >
                  <div className="flex h-6 w-6 text-blue-700">
                    <FacebookIcon />
                  </div>
                  <Typography className="group-hover:text-blue-700">
                    /Sahayata
                  </Typography>
                </Link>
              </div>
              <div className="flex flex-col items-center gap-6 lg:col-span-2">
                <div className="relative flex h-14 w-32 lg:h-20 lg:w-44 ">
                  <Link href="/">
                    <Image
                      src="/assets/img/logo.png"
                      alt="logo"
                      fill
                      className="object-contain"
                    />
                  </Link>
                </div>
                <Typography className="max-w-lg" align="center">
                  Sahayata Uniting Hearts, Transforming Lives – Be the Difference Today
                </Typography>
                <div className="ld:text-body grid grid-cols-3 gap-x-8 gap-y-2 text-center text-body-sm uppercase text-gray-600 lg:grid-cols-6">
                  <Link href="/" className="hover:text-blue-700">
                    Home
                  </Link>
                  <Link href="/about" className="hover:text-blue-700">
                    Dashboard
                  </Link>
                  <Link href="/blogs" className="hover:text-blue-700">
                    Campaign
                  </Link>
                  <Link href="/portfolio" className="hover:text-blue-700">
                    Support
                  </Link>
                  <Link href="/our-team" className="hover:text-blue-700">
                    Our Team
                  </Link>
                  <Link href="/contact" className="hover:text-blue-700">
                    Contact
                  </Link>
                </div>
              </div>

              <div className="flex h-full flex-col items-center justify-center gap-4 border-l-1 lg:items-end lg:border-black">
                <Link
                  className="group flex items-center gap-3"
                  href="tel:#"
                  target="_blank"
                >
                  <div className="flex h-6 w-6 text-blue-700">
                    <CallIcon />
                  </div>
                  <Typography className="group-hover:text-blue-700">
                    /(123) 456 - 7890
                  </Typography>
                </Link>
                <Link
                  className="group flex items-center gap-3"
                  href="mailto:#"
                  target="_blank"
                >
                  <div className="flex h-6 w-6 text-blue-700">
                    <EnvelopeIcon />
                  </div>
                  <Typography className="group-hover:text-blue-700">
                    /contact@Sahayata.com
                  </Typography>
                </Link>
              </div>
            </div>

            <div className="flex w-full justify-center border-t-1 border-black py-10 text-center">
              <Typography>
                © Copyright Sahayata | Developed by
                <Link href="#" target="_blank" className="hover:text-blue-700">
                  Sahayata
                </Link>
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  )
}
