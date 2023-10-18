export default function page() {
  return (
    <div className="container min-h-screen min-w-full bg-indigo-100 px-20 py-8 relative">
      {/* <nav className="flex items-center">
          <ul className='flex-1 text-center'>
            <li className='list-none inline-block px-5'><a href="#" className='no-underline px-2 font-semibold'>Home</a></li>
            <li className='list-none inline-block px-5'><a href="#"  className='no-underline px-2 font-semibold'>Contact</a></li>
            <li className='list-none inline-block px-5'><a href="#"  className='no-underline px-2 font-semibold'>About</a></li>
            <li className='list-none inline-block px-5'><a href="#"  className='no-underline px-2 font-semibold'>Donations</a></li>
          </ul>
        </nav> */}
      {/* <div className='flex-col-gap-12'> */}

      <div className="text-black mt-24 ">
        <h1 className="text-6xl font-bold leading-normal">
          Donation can <br />
          change the world
        </h1>
        <p className="text-2xl font-semibold leading-normal text-purple-500">
          Donation is a way of love
        </p>
        <br />
        <p className="text-1xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit dolore minima,
          <br /> molestias laborum veniam odio voluptates atque consectetur
          fugiat perferendis.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="text-white bg-purple-600 rounded-3xl py-3 px-8 font-medium inline-block mr-4 hover:bg-transparent
           hover:border-purple-400 hover:text-black duration-300 hover:border border border-transparent"
          >
            Donate now
          </a>
        </div>
      </div>
      <div>
        <img
          src="/assets/img/r.png"
          className="w-full xl:w-1/2 xl:absolute bottom-40 right-8 bg-cover"
        />
      </div>
      <div className=""></div>
    </div>
  )
}
