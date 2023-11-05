'use client'


export default function Password() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f4f1] ">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
        <section className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Change your Password</span>
          <span className="font-light text-gray-400 mb-8">
           Enter your new password below to change your password
          </span>
          <form action="#" className="flex flex-col">
          <div className='mt-2 '>
          <p>New Password</p>
            <input className='w-full border border-slate-500 p-2 rounded-lg text-black text-sm '
        type="text"
        id='text'
        placeholder='New password'
        required />
          </div>
          <div className='mt-2'>
          <p>Confirm Password</p>
            <input className='w-full border border-slate-500 p-2 rounded-lg text-black text-sm '
        type="text"
        id='text'
        placeholder='Confirm your password'
        required />
          </div>

            <div className="flex justify-between w-full py-3">
            <button className="w-full bg-blue-600 text-white p-2 rounded-lg mb-2 mt-2 hover:bg-blue-400 ">
              CHANGE PASSWORD
            </button> 
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
