'use client'

import { useRouter } from 'next/navigation'

export default function ErrorPage({ statusCode, message }) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="text-center border px-36 py-10 rounded-xl">
        <h1 className="text-4xl font-bold mb-4">{`Error Found :(`}</h1>
        <p className="text-lg text-gray-600 mb-8">{message}</p>
        <button
          onClick={() => router.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}
