'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaEnvelope, FaMap, FaShoppingBag } from 'react-icons/fa'

export default function page() {
  const [error, setError] = useState(undefined)
  const submitContact = async e => {
    e.preventDefault()

    if (e.target['checkbox'].checked === false) {
      return setError('Agree to terms before continuing.')
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
        {
          firstname: e.target['first-name'].value,
          lastname: e.target['last-name'].value,
          email: e.target['business-email'].value,
          phone: e.target['phone-number'].value,
          companyname: e.target['company-name'].value,
          address: e.target['company-location'].value,
          message: e.target['anythingElse'].value
        }
      )
      if (response.data) {
        Notify('success', 'Thankyou for your query!.')
      }
      console.log(response)
    } catch (error) {
      setError(error.response.data.error || 'There is some error!')
    }

    e.target.reset()
  }
  return (
    <div className="flex flex-col gap-5 pb-10">
      <div className="bg-[#2540C4]">
        <div className="container flex p-3 lg:p-5">
          <div className="hidden w-1/2 flex-col justify-center text-white lg:flex">
            <div className="relative w-full lg:flex lg:h-[250px]">
              <Image
                src="/assets/img/support-min.png"
                fill
                alt="Open Support Ticket"
                quality={100}
                layout="fill"
                className="object-contain p-4"
              />
            </div>
            <span className="text-2xl font-bold">We are here to help.</span>
            <span>
              Let us know your concern, and we will get in touch with you.
            </span>
          </div>
          <div className="flex w-full flex-col gap-4 rounded bg-white p-4 shadow lg:w-1/2">
            <span className="text-2xl font-semibold">
              Please provide details to contact you
            </span>
            <form
              onSubmit={e => submitContact(e)}
              className="flex flex-col gap-3"
            >
              <div className="formFlexRow">
                <div className="formElementsOne">
                  <input
                    type="text"
                    name="first-name"
                    placeholder="* First Name"
                    required
                  />
                </div>
                <div className="formElementsOne">
                  <input
                    type="text"
                    name="last-name"
                    placeholder="* Last Name"
                    required
                  />
                </div>
                <div className="formElementsOne">
                  <input
                    type="email"
                    name="business-email"
                    placeholder="* Email"
                    required
                  />
                </div>
                <div className="formElementsOne">
                  <input
                    type="number"
                    name="phone-number"
                    placeholder="* Phone Number"
                    required
                  />
                </div>
                <div className="formElementsOne">
                  <input
                    type="text"
                    name="company-name"
                    placeholder=" Company Name"
                  />
                </div>
                <div className="formElementsOne">
                  <input
                    type="text"
                    name="company-location"
                    placeholder="* Address"
                  />
                </div>
              </div>

              <div className="formElementsTwo">
                <input
                  type="text"
                  className="anythingElse"
                  name="anythingElse"
                  placeholder="Anything else we should know?"
                />
              </div>

              <div className="formElements">
                <input
                  type="checkbox"
                  className="largerCheckbox"
                  name="checkbox"
                />
                <span>
                  I agree to send me marketing communications, as described in
                  the Website and Cookie Policy.
                </span>
              </div>
              {error && (
                <span style={{ color: '#FF9494', fontSize: '0.8em' }}>
                  {error}
                </span>
              )}

              <div className="flex w-full justify-center">
                <button
                  type="submit"
                  className=" rounded bg-blue-700 px-4 py-2 text-white"
                >
                  Request a Callback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container flex w-full flex-col justify-center gap-10 px-10 lg:flex-row">
        <div className="flex w-1/2 flex-col items-center justify-center">
          <div className="flex flex-col gap-2 pl-32 lg:pl-0">
            <span className="text-lg font-semibold">Contact us</span>
            <span className="flex items-center gap-2">
              <span className="h-5 w-5 text-lg text-black">
                <FaEnvelope />
              </span>
              <span>support@sahayata.com</span> <span>help@sahayat.com</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-5 w-5 text-lg text-black">
                <FaMap />
              </span>

              <span> SAHAYATA Limited, Chitwan, Nepal</span>
            </span>

            <div>
              <button className="rounded bg-[#2540C4] px-3 py-1 text-white">
                Open in Google Map
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d390.25362573765875!2d-0.20395645250441646!3d51.49089123206138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760f8dbcadb5c1%3A0xcc41070b4f4fe1d4!2sJ2D2!5e0!3m2!1sen!2snp!4v1705736578616!5m2!1sen!2snp"
            width="370"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div className="container">
        <span className="text-lg font-semibold">
          Help a team online with SAHAYATA
        </span>
        <p>
          SAHAYATA presents a comprehensive solution for individuals seeking
          financial assistance, be it for life-saving purposes or the sustenance
          and management of their social projects.
        </p>

        <p>
          Make life easier for you and your loved ones. Get your first donation
          and help anyone in need.
        </p>
        <span className="text-lg font-semibold">Careers at DoHo Care</span>
      </div>
    </div>
  )
}
function Notify(arg0: string, arg1: string) {
  throw new Error('Function not implemented.')
}
