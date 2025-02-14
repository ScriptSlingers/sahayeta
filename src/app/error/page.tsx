'use client'

import { useRouter } from 'next/navigation'

export default function ErrorPage({ statusCode, message }) {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="rounded-xl border px-36 py-10 text-center">
        <h1 className="mb-4 text-4xl font-bold">{`Error Found :(`}</h1>
        <p className="mb-8 text-lg text-gray-600">{message}</p>
        <button
          onClick={() => router.back()}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}
