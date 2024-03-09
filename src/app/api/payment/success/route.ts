import { NextRequest } from "next/server";
import CryptoJS from "crypto-js";
import { prisma } from "@sahayeta/lib";
export async function GET(req: NextRequest,) {
    const searchParams = req.nextUrl.searchParams
    const data = searchParams.get('data')
    const words = CryptoJS.enc.Base64.parse(data);
    const decodedValues = CryptoJS.enc.Utf8.stringify(words);
    const transactionJson = JSON.parse(decodedValues);

    const status = {
        "COMPLETE": "completed",
        "PENDING": "pending",
        "CANCELED": "cancelled",
    }

    const updatedPayment = await prisma.payment.update({
        where: { paymentId: transactionJson.transaction_uuid },
        data: {
            paymentStatus: status[transactionJson.status],
            paymentAmount : parseFloat(transactionJson.total_amount),
        }
      })
  
      if (!updatedPayment) {
        return Response.json({ message: 'Unable to update' }, { status: 500 })
      }
    if(transactionJson.status == "COMPLETE")
    return Response.redirect("http://localhost:3000/paymentsuccess")
}

export async function POST(req: NextRequest) {
    console.log(req.body)
}