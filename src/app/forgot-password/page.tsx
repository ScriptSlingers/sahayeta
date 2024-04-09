"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page() {
    const router = useRouter();
    const [error, setError] = useState("");

    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/dashboard");
        }
    }, [sessionStatus, router]);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const email = e.target[0].value;

        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }

        try {
            const res = await fetch("/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            if (res.status === 400) {
                setError("User with this email is not registered.");
            } else if (res.status === 200) {
                setError("");
                router.push("/login");
            }
        } catch (error) {
            setError("Error, try again");
            console.log(error);
        }

    };

    if (sessionStatus === "loading") {
        return <h1>Loading...</h1>;
    }


    return (
        <div className='flex justify-center items-center h-[700px]'>
            <div className='bg-white shadow-lg mt-4 px-3 md:px-8 py-6 rounded-2xl w-full md:w-1/2 lg:w-1/4 font-Roboto text-left '>
                <h3 className='font-bold text-2xl text-blue-600 text-start'>
                    Forget Password
                </h3>
                <div className='mt-4 text-base text-gray-400'>
                    {" "}
                    Don&apos;t worry, we&apos;ll send you an email to reset your
                    password.
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <div className='mt-4'>
                            <label className='block' htmlFor='email'>
                                Email
                            </label>
                            <input
                                type='Email'
                                placeholder='Enter Your Email Here'
                                className='mt-2 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-600'
                                id='password'
                            />
                        </div>
                        <button
                            type="submit"
                            className='bg-blue-600 mt-4 px-6 py-2.5 rounded-lg w-full text-white ' >
                            Reset Password
                        </button>
                    </div>
                </form>
                <div className='flex md:flex-row flex-col items-center gap-1 mt-4'>
                    <span>Don&apos;t have an account?</span>
                    <button className='text-base text-blue-600 '>
                        {" "}
                        signup
                    </button>
                </div>
            </div>
        </div>
    );
}
