
import { prisma } from "@sahayeta/lib";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email } = (await req.json()) as { email: string };

        const lowerCaseEmail = email.toLowerCase();

        const existingUser = await prisma.user.findUnique({
            where: {
                email: lowerCaseEmail,
            },
        });

        if (!existingUser) {
            return new NextResponse(
                JSON.stringify({
                    status: "error",
                    message: "Email does not exist",
                }),
                { status: 400 }
            );
        }

        const passwordResetToken = crypto.randomBytes(20).toString("hex");
        const passwordResetExpires = Date.now() + 3600000;

        await prisma.user.update({
            where: {
                email: lowerCaseEmail,
            },
            data: {
                resetToken: passwordResetToken,
                resetTokenExpiry: new Date(passwordResetExpires),
            },
        });

        const resetUrl = `http://localhost:3000/forgot-password/${passwordResetToken}`;

        console.log(resetUrl);

        return new NextResponse(
            JSON.stringify({
                status: "success",
                message: "Password reset email sent.",
            }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
