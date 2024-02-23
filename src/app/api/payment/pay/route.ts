import { CallIcon } from './../../../../icons/CallIcon';
import { NextRequest, NextResponse } from 'next/server'
export async function GET(request: NextRequest) {
 
    const response = await fetch("https://khalti.com/api/v2/epayment/initiate/", {
        method: "POST",
        headers: {
         'Authorization': "key test_secret_key_4e0474fd74da4e039ae3d4efaf31a7b9",
         'Content-Type': "application/json",
        },
        body: JSON.stringify({
          "return_url": "http://localhost:3000/payment",
          "website_url": "http://localhost:3000/",
          "amount": "10",
          "purchase_order_id": "Order01",
          "purchase_order_name": "reshma",
          customer_info: {
            "name":"Reshma Pariyar",
            "email": "pariyarreshma32@gmail.com",
            "phone": "9848569827",
          }
        })
      }).then((res) => {
        console.log(res)
       return res.json()
      })
    return NextResponse.json({response})
  
  }