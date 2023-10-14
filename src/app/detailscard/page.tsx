'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ProfileIcon } from '../../icons'

export default function Card() {
  const [showFullContent, setShowFullContent] = useState(false)
  const content = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pellentesque sapien ac quam dignissim, id ullamcorper sem lacinia. Nam in lacus accumsan, tempus eros eu, vulputate nisl. Proin vehicula arcu nec orci auctor, vitae volutpat turpis eleifend. Vivamus tristique urna non massa finibus, et scelerisque dolor volutpat. Duis condimentum felis ut lectus commodo, et facilisis nibh tristique. Quisque sed mi eget justo auctor porttitor vitae in leo. Sed a sapien ac velit vestibulum cursus. Quisque quis consequat arcu. Proin et quam eros. Vestibulum tempus convallis risus a aliquam. Proin in dui euismod, commodo arcu a, venenatis neque.
      `

  const shortContent = content.slice(0, 200)

  const toggleContent = () => {
    setShowFullContent(!showFullContent)
  }

  return (
    <>
      <div className="container  ">
        <div className="lg:w-1/2 sm:w-full flex flex-col p-10 gap-6 border rounded">
          <div className="text-xl font-maven font-semibold">
            Fund For Children
          </div>
          <div className="relative flex h-96 ">
            <Link href="/">
              <Image
                src="/assets/img/card.jpg"
                alt="logo"
                fill
                className="object-cover rounded-xl"
              />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border border-accent p-3 rounded-full">
              <Link href="#">
                <ProfileIcon />
              </Link>
            </div>
            <div className="border rounded-md p-2">
              Anjali Poudel is organizing this fundraiser.
            </div>
          </div>
          <div className="border-b border-slate-500"></div>
          <div>Hello my name is Anjali,</div>
          <div className="text-justify">
            {showFullContent ? content : shortContent}
            {content.length > 200 && (
              <button
                onClick={toggleContent}
                className="text-blue-700 flex gap-6 underline "
              >
                {showFullContent ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
          <div className="lg:flex  gap-3 items-center justify-center bg-blue-50  shadow rounded w-full p-3 ">
            <div>
              <div className="relative flex w-20 h-20 ">
                <Link href="/">
                  <Image
                    src="/assets/img/donateicon.png"
                    alt="logo"
                    fill
                    className="object-cover rounded-full"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-semibold font-maven text-lg">
                `Give $20 and be a founding donor`
              </div>
              <div className="text-slate-600">
                Your donation is the start of Anjali&apos;s journey to success.
                Your early support inspires others to donate.
              </div>
              <div className="flex items-center justify-center font-maven font-semibold text-base  rounded  p-2">
                Make a donation
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-xl h-96 w-1/3 m-auto rounded">
        <div>`$500,000 CAD goal`</div>
        <div>-----------------</div>
        <div className="flex items-center justify-center font-maven font-semibold text-base  rounded  p-2">
          Make a donation
        </div>
        <div className="flex items-center justify-center font-maven font-semibold text-base  rounded  p-2">
          Make a donation
        </div>
      </div>
    </>
  )
}
