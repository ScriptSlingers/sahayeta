'use client'
import Image from 'next/image'
import donationImage from '../../../public/assets/img/children.jpg'
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ name: "", email: "", password: "" });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: process.env.NEXTAUTH_URL });
      toast.success("Signup successful")
    } catch (error: any) {
      setLoading(false);
      setError(error);
      toast.error("Error occurred while creating user account")

    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f4f1]">
      <div className="relative flex flex-col rounded-2xl bg-white shadow-2xl md:flex-row overflow-hidden">
        <section className=" relative">
          <Image
            src={donationImage}
            alt=""
            className="hidden h-full w-[450px] object-cover md:block"
          />
        </section>

        <section className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome to Sahayata</span>
          <span className="mb-8 font-light text-gray-700">
            Create your account
          </span>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            {error && (
              <p className='mb-6 rounded bg-red-300 py-4 text-center'>
                {error}
              </p>
            )}
            <input
              className="w-full rounded border border-neutral-400 p-3 text-sm text-black"
              required
              type='name'
              name='name'
              value={formValues.name}
              onChange={handleChange}
              placeholder='Name'
            />
            <input
              className="w-full rounded border border-neutral-400 p-3 text-sm text-black"
              required
              type='email'
              name='email'
              value={formValues.email}
              onChange={handleChange}
              placeholder='Email address'
            />
            <input
              className="w-full rounded border border-neutral-400 p-3 text-sm text-black"
              required
              type='password'
              name='password'
              value={formValues.password}
              onChange={handleChange}
              placeholder='Password'
            />
            <div className="flex w-full justify-between py-4">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">
                  I accept {" "}
                  <a href="#" className="font-medium text-blue-600">
                    Terms of service and privacy policy
                  </a>
                </span>
              </div>
            </div>

            <button
              type='submit'
              style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
              className="mb-6 w-full rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-400 "
              disabled={loading}
            >
              {loading ? "Creating an account" : "Create an account"}
            </button>
          </form>
          <p className="text-center text-sm font-medium text-[#9A9A9A] ">
            --- Or login with ---
          </p>
          <br />
          <button
            className="mb-6 w-full rounded-lg border border-black bg-black p-2 text-white hover:bg-white hover:text-black"
            onClick={() =>
              signIn('google', { callbackUrl: 'https://localhost:3000/' })
            }
          >
            <FcGoogle className="g-6 mr-2 inline w-6" />
            Sign in with Google
          </button>
          <div className="text-center text-gray-800">
            Already have an account?
            <a
              href="/login"
              className="text-md font-bold text-black hover:text-blue-500 "
            >
              {" "}Login
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
