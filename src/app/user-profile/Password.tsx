export default function Password() {
  return (
        <div className="px-10 py-5 w-full ">
          <span className="font-light text-black mb-8">
            Enter your new password below to change your password
          </span>
          <form action="#" className="flex flex-col w-full">
            <div className="mt-2 ">
              <p>New Password</p>
              <input
                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm "
                type="text"
                id="text"
                placeholder="New password"
                required
              />
            </div>
            <div className="mt-2">
              <p>Confirm Password</p>
              <input
                className="w-full border border-slate-500 p-2 rounded-lg text-black text-sm "
                type="text"
                id="text"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="flex justify-between w-full py-3">
              <button className="w-full bg-blue-600 text-white p-2 rounded-lg mb-2 mt-2 hover:bg-blue-400 ">
                CHANGE PASSWORD
              </button>
            </div>
          </form>
        </div>
      )
}
