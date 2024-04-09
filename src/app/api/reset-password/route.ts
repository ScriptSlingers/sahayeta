import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as {
    email: string;
    password: string;
  };

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      const hashedPassword = await hash(password, 12);
      await prisma.user.update({
        where: { email: email },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });
      return new NextResponse("User's password updated successfully", {
        status: 200,
      });
    } else {
      return new NextResponse("Error updating password", { status: 400 });
    }
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
