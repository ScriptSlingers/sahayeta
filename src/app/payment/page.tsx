import React from 'react'
export default function Payment() {
  const handlePayment = async (payment_method: string) => {
    const url = ''
    const data = {
      amount: 100,
      products: [{ product: 'test', amount: 100, quantity: 1 }],
      payment_method
    }
  }
  return (
    <>
      <div className="">
        <div className="container mx-auto mt-8">
          <form className="max-w-md mx-auto p-8 bg-white shadow-lg rounded">
            <div className="mb-4">
              <label
                htmlFor="phonenumber"
                className=" block text-gray-700 text-sm font-bold mb-2"
              >
                Amount
              </label>
              <input
                type="text"
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                id="amount"
                placeholder="amount"
                required
              />
            </div>
            <div className="md:flex py-4">
              <button className="rounded w-full py-2 px-3 text-center font-semibold bg-blue-500 text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-transparent hover:border-blue-400 hover:text-blue-500 duration-500 hover:border border border-transparent">
                onClick={() => handlePayment('esewa')}
                Donate with khalti
              </button>
            </div>
            <div className="flex flex-row gap-2">
              <input type="checkbox" id="checkbox" />
              <p className=" text-blue-500 text-sm">
                Don't display my name publicly on the fundraiser.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
