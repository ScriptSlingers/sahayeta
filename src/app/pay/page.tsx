'use client'
import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import axios from 'axios'

export default function Pay({ searchParams }) {
  const campaignId = searchParams.campaignid
  const [amount, setAmount] = useState(500)
  const [signature, setSignature] = useState('')
  const [transactionId, setTransactionId] = useState('')

  useEffect(() => {
    if (transactionId.length < 1) {
      const createPayment = () => {
        axios
          .post(
            '/api/payment',
            {
              paymentMethodId: 'clt09rlfr0000x5yez6h51gnx',
              campaignId: campaignId
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
          .then(res => setTransactionId(res.data?.paymentId))
      }
      createPayment()
    }
  }, [transactionId])

  const handleAmountChange = e => {
    setAmount(e.target.value)
  }

  const generateSignature = () => {
    const sigInput = `total_amount=${amount},transaction_uuid=${transactionId},product_code=EPAYTEST`
    console.log(sigInput)
    const hash = CryptoJS.HmacSHA256(sigInput, '8gBm/:&EnhH.1/q')
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash)
    console.log(hashInBase64)
    setSignature(hashInBase64)
  }

  useEffect(() => {
    generateSignature()
  }, [amount, transactionId])

  return (
    <div className=" mx-auto mt-4 max-w-md rounded  bg-white p-8 shadow-lg">
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        <div className="flex flex-col justify-center gap-4">
          <label className=" justify-left mb-2 flex text-sm font-bold text-gray-700 ">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={amount}
            required
            className="rounded bg-gray-100 px-4 py-2"
            onChange={handleAmountChange}
          ></input>
          <input
            type="hidden"
            id="tax_amount"
            name="tax_amount"
            value="0"
            required
          ></input>
          <input
            type="hidden"
            id="total_amount"
            name="total_amount"
            value={amount}
            required
          ></input>
          <input
            type="hidden"
            id="transaction_uuid"
            name="transaction_uuid"
            value={transactionId}
            required
          ></input>
          <input
            type="hidden"
            id="product_code"
            name="product_code"
            value="EPAYTEST"
            required
          ></input>
          <input
            type="hidden"
            id="product_service_charge"
            name="product_service_charge"
            value="0"
            required
          ></input>
          <input
            type="hidden"
            id="product_delivery_charge"
            name="product_delivery_charge"
            value="0"
            required
          ></input>
          <input
            type="hidden"
            id="success_url"
            name="success_url"
            value="http://localhost:3000/api/payment/success"
            required
          ></input>
          <input
            type="hidden"
            id="failure_url"
            name="failure_url"
            value="http://localhost:3000/paymentfailure"
            required
          ></input>
          <input
            type="hidden"
            id="signed_field_names"
            name="signed_field_names"
            value="total_amount,transaction_uuid,product_code"
            required
          ></input>
          <input
            type="hidden"
            id="signature"
            name="signature"
            required
            value={signature}
          ></input>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 "
            type="submit"
            disabled={!(transactionId.length > 0)}
          >
            Pay with esewa
          </button>
        </div>
      </form>
    </div>
  )
}
