import { Link } from "@inertiajs/react";
import logoBlue from "../../../public/logoWhite.svg";
import gbBlue from "../../../public/images/Blue-dotted-Background-images.jpg";
import {
  FaUser,
  FaHeart,
  FaWallet,
  FaAddressCard,
  FaHome,
  FaBars
} from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { FaCartShopping, FaGear, FaHandshake } from "react-icons/fa6";

export default function ProfileLayout({
  children,
  pageName = "Dashboard",
  user,
}) {
  var isProvider = false;
  if (user && user.hasOwnProperty("roles"))
    isProvider = user.roles.some((role) => role.name === "provider");

  return (
    <main className={`bg-[url('${gbBlue}')] bg-auto`} >
      <div className="h-screen flex bg-white/30">
        <nav className="w-52 flex flex-col justify-center">
          <div className="mt-4 flex justify-center">
            <Link href={route("index")}>
              <img src={logoBlue} alt="Logo" />
            </Link>
          </div>
          <ul className="flex flex-col gap-2 mt-10 text-xl flex-1">
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("index")}
                className="flex gap-2 items-center px-5"
              >
                <FaHome className="text-blue-700" />
                <p className="">Home</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("profile.dashboard")}
                className="flex gap-2 items-center px-5"
              >
                <AiFillDashboard className="text-blue-700" />
                <p className="">Dashboard</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("profile.edit")}
                className="flex gap-2 items-center px-5"
              >
                <FaUser className="text-blue-700" />
                <p className="">Profile</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("index")}
                className="flex gap-2 items-center px-5"
              >
                <FaCartShopping className="text-blue-700" />
                <p>Orders</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("index")}
                className="flex gap-2 items-center px-5"
              >
                <FaHeart className="text-blue-700" />
                <p>Wishlist</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("index")}
                className="flex gap-2 items-center px-5"
              >
                <FaAddressCard className="text-blue-700" />
                <p>Address</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("index")}
                className="flex gap-2 items-center px-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Payment</p>
              </Link>
            </li>
            {isProvider && (
              <li className="hover:bg-blue-100 py-2">
                <Link
                  href={route("profile.provider")}
                  className="flex gap-2 items-center px-5 "
                >
                  <FaHandshake className="text-blue-700" />
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
        <div className="flex flex-col flex-1">
          <div className="my-4 flex flex-col md:flex-row justify-between md:items-center md:mr-5">
            <div className="mb-4 md:mb-0">
              <h1 className="text-4xl">Profile {pageName}</h1>
              <p className="text-gray-700">Welcom to the profile section</p>
            </div>
          </div>
          <div className="bg-gray-200/60 rounded-xl px-10 py-10 mb-8 md:mb-14 flex-1 flex flex-col mr-4 md:mr-5 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
