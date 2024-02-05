import { Link } from "@inertiajs/react";
import logoBlue from "../../../public/logoWhite.svg";
import gbBlue from "../../../public/images/Blue-dotted-Background-images.jpg";
import {
  FaUser,
  FaHeart,
  FaWallet,
  FaAddressCard,
  FaHome,
  FaBars,
} from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { FaCartShopping, FaGear, FaHandshake } from "react-icons/fa6";
import { useEffect } from "react";
export default function ProfileLayout({ children, pageName = "Dashboard", pageSubtitle = "Welcome to the admin section", user }) {
  var isProvider = false;
  if (user && user.hasOwnProperty("roles"))
    isProvider = user.roles.some((role) => role.name === "provider");

  useEffect( () => {
    var parent = document.querySelector('#parent');
    parent.scrollTo(0, 0);
  }, [])
  return (
    <main className={`bg-[url('${gbBlue}')] bg-cover h-full`}>
      <div className="md:h-screen flex md:flex-row flex-col bg-white/30">
        <nav className="md:w-52 flex flex-col justify-center">
          <div className="mt-4 flex justify-center">
            <Link href={route("index")}>
              <img src={logoBlue} alt="Logo" />
            </Link>
          </div>
          <ul className="flex flex-row max-md:justify-center max-md:items-center md:flex-col gap-2 md:mt-10 my-5 text-xl md:flex-1 flex-wrap">
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("index")}
                className="flex gap-2 items-center px-5"
              >
                <FaHome className="text-blue-700 hidden md:block" />
                <p className="">Home</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("profile.dashboard")}
                className="flex gap-2 items-center px-5"
              >
                <AiFillDashboard className="text-blue-700 hidden md:block" />
                <p className="">Dashboard</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2 hidden md:block">
              <Link
                href={route("profile.edit")}
                className="flex gap-2 items-center px-5"
              >
                <FaUser className="text-blue-700 hidden md:block" />
                <p className="">Account</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("profile.orders")}
                className="flex gap-2 items-center px-5"
              >
                <FaCartShopping className="text-blue-700 hidden md:block" />
                <p>Orders</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("profile.wishlist")}
                className="flex gap-2 items-center px-5"
              >
                <FaHeart className="text-blue-700 hidden md:block" />
                <p>Wishlist</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("profile.payments")}
                className="flex gap-2 items-center px-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Payments</p>
              </Link>
            </li>
            {isProvider && (
              <li className="hover:bg-blue-100 py-2">
                <Link
                  href={route("profile.provider")}
                  className="flex gap-2 items-center px-5 "
                >
                  <FaHandshake className="text-blue-700 hidden md:block" />
                  <p>Provider</p>
                </Link>
              </li>
            )}
          </ul>
          <div className="self-center mb-5">
            <Link
              href={route("logout")}
              method="post"
              as="button"
              className="text-white hover:underline text-lg bg-blue-700 py-1 px-4 rounded font-bold"
            >
              Log out
            </Link>
          </div>
        </nav>
        <div className="flex flex-col flex-1 w-full">
          <div className="my-4">
            <h1 className="text-4xl md:text-left text-center">{pageName}</h1>
            <p className="text-gray-700 md:text-left text-center">{pageSubtitle}</p>
          </div>
          <div id="parent" className="bg-gray-200/60 overflow-auto rounded-xl md:px-10 px-5 py-3 md:py-10 flex-1 md:mb-14 flex flex-col md:mr-5">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
