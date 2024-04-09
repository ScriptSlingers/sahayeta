import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const expiryDate = new Date(Date.now()).toISOString();
  const user = await prisma.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: {
        gt: expiryDate,
      },
    },
  });

  if (!user) {
    return new NextResponse("Invalid token or has expired", {
      status: 400,
    });
  }

  return new NextResponse(JSON.stringify(user), { status: 200 });
}
