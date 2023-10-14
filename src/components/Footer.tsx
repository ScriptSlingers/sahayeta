import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link href="/">
            <Image
              src="/assets/img/logo.png"
              alt="Hero Section"
              width={150}
              height={50}
              className="object-cover"
              quality={100}
            />
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Air plant banjo lyft occupy retro adaptogen indego
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3"></h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Home</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Deals</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Blog</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800"></a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3"></h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">WishList</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Cart</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Loggin</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Contact</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-black text-sm text-center sm:text-left">
            {' '}
            © SAHAYATA
            <a href="#" className="text-black ml-1" target="_blank">
              Terms Privacy Notice Legal
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500"></a>
            <a className="ml-3 text-gray-500"></a>
            <a className="ml-3 text-gray-500"></a>
            <a className="ml-3 text-gray-500"></a>
          </span>
        </div>
      </div>
    </footer>
  );
}

const FooterCard = ({ icon, url }: { icon: JSX.Element; url: string }) => {
  return (
    <Link href={url}>
      <div className=" text-white hover:-translate-y-1 duration-300 hover:scale-110 flex cursor-pointer">
        <div className="w-10 h-9 p-2 items-center justify-center"> {icon}</div>
      </div>
    </Link>
  );
};
