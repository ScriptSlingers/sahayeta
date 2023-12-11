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
        <div className="flex w-full justify-center bg-accent">
          <div className="flex flex-col">
            <div className="min-h-96 container grid grid-cols-1 items-center gap-x-9 gap-y-12 py-14 lg:grid-cols-4">
              <div className="flex h-full flex-col items-center justify-center gap-4 border-r-1 lg:items-start lg:border-black">
                <Link
                  className="group flex items-center gap-3"
                  href="#"
                  target="_blank"
                >
                  <div className="flex h-6 w-6 text-secondary">
                    <InstagramIcon />
                  </div>
                  <Typography className="group-hover:text-secondary">
                    /Sahayata
                  </Typography>
                </Link>
                <Link
                  className="group flex items-center gap-3"
                  href="#"
                  target="_blank"
                >
                  <div className="flex h-6 w-6 text-secondary">
                    <FacebookIcon />
                  </div>
                  <Typography className="group-hover:text-secondary">
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
                <div className="ld:text-body grid grid-cols-3 gap-x-10 gap-y-2 text-center text-body-sm uppercase text-gray-600 lg:grid-cols-6">
                  <Link href="/" className="hover:text-secondary">
                    Home
                  </Link>
                  <Link href="/about" className="hover:text-secondary">
                    About
                  </Link>
                  <Link href="/blogs" className="hover:text-secondary">
                    Blog
                  </Link>
                  <Link href="/portfolio" className="hover:text-secondary">
                    Portfolio
                  </Link>
                  <Link href="/our-team" className="hover:text-secondary">
                    Our Team
                  </Link>
                  <Link href="/contact" className="hover:text-secondary">
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
                  <div className="flex h-6 w-6 text-secondary">
                    <CallIcon />
                  </div>
                  <Typography className="group-hover:text-secondary">
                    /(123) 456 - 7890
                  </Typography>
                </Link>
                <Link
                  className="group flex items-center gap-3"
                  href="mailto:#"
                  target="_blank"
                >
                  <div className="flex h-6 w-6 text-secondary">
                    <EnvelopeIcon />
                  </div>
                  <Typography className="group-hover:text-secondary">
                    /contact@Sahayata.com
                  </Typography>
                </Link>
              </div>
            </div>

            <div className="flex w-full justify-center border-t-1 border-black py-10 text-center">
              <Typography>
                © Copyright Sahayata | Developed by
                <Link href="#" target="_blank" className="hover:text-secondary">
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
