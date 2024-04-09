import { NextRequest, NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request: NextRequest) {
  const username = process.env.EMAIL_USERNAME;
  const password = process.env.EMAIL_PASSWORD;
  const senderEmail = process.env.PERSONAL_EMAIL;

  const { email, resetUrl } = (await request.json()) as {
    email: string;
    resetUrl: string;
  };

  const transporter = nodemailer.createTransport({
    host: "mail.boostenhance.com",
    port: 465,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },

    auth: {
      user: username,
      pass: password,
    },
  });

  try {
    await transporter.sendMail({
      from: username,
      to: email,
      replyTo: senderEmail,
      subject: `Password Reset Link`,
      html: `
            <p>Please <a href="${resetUrl}">click here</a> to reset the password for your account.</p>
            <p>Or, click on the button below:</p>
            <a href="${resetUrl}" style="text-decoration: none;">
              <button style="background-color: #007bff;
                            border: none;
                            color: white;
                            padding: 15px 32px;
                            text-align: center;
                            display: inline-block;
                            font-size: 16px;
                            margin: 4px 2px;
                            cursor: pointer;
                            border-radius: 10px;
                            transition: background-color 0.3s;">
                Reset Password
              </button>
            </a>            
             `,
    });

    return NextResponse.json({ message: "Password reset link sent." });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "COULD NOT SEND MESSAGE" },
      { status: 500 },
    );
  }
}
