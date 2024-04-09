import React from 'react'
const crypto = require('crypto')

// const signature = this.createSignature(
//     'total_amount=${order.amount},transaction_uuid=$(order._id},product_code-EPAYTEST');
const formData = {
  amount: '100',
  failure_url: 'https://google.com',
  product_delivery_charge: '0',
  product_service_charge: '0',
  product_code: 'EPAYTEST',
  signature: 'YVweM7CgAtZW5tRKica/BIeYFvpSj09AaInsulqNKHk=',
  signed_field_names: 'total_amount,transaction_uuid,product_code',
  success_url: 'https://esewa.com.np',
  tax_amount: '10',
  total_amount: '110',
  transaction_uuid: 'ab14a8f2b02c3'
}
exports.createSignature = message => {
  const secret = '8gBm/:&EnhH.1/q' //different in production
  //create an HMAC-SHA256 hash
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(message)

  //get the digest in base64 format
  const hashInBase64 = hmac.digest('base64')
  return hashInBase64
}
