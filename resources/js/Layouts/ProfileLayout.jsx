import { Link } from "@inertiajs/react";
import logoBlue from "../../../public/logoWhite.svg";
import gbBlue from "../../../public/images/Blue-dotted-Background-images.jpg";
import {
  FaUser,
  FaHeart,
  FaWallet,
  FaAddressCard,
  FaLock,
} from "react-icons/fa";
import { FaCartShopping, FaGear, FaHandshake } from "react-icons/fa6";
import { useState } from "react";

export default function ProfileLayout({
  children,
  pageName = "Dashboard",
  user,
}) {
  const [showProviderOptions, setShowProviderOptions] = useState(false);
  const handleProviderClick = () => {
    setShowProviderOptions(!showProviderOptions);
    document.getElementById("providerDropdown");
  };
  var isAdmin = false;
  var isProvider = false;
  if (user && user.hasOwnProperty("roles"))
    isAdmin = user.roles.some((role) => role.name === "admin");
  if (user && user.hasOwnProperty("roles"))
    isProvider = user.roles.some((role) => role.name === "provider");

  return (
    <main className={`bg-[url('${gbBlue}')] bg-cover`}>
      <div className="h-screen flex bg-white/30">
        <nav className="w-52 flex flex-col">
          <div className="p-2 flex justify-center">
            <Link href={route("index")}>
              <img src={logoBlue} alt="Logo" />
            </Link>
          </div>
          <ul className="flex flex-col gap-2 mt-10 text-xl flex-1">
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("profile.dashboard")}
                className="flex gap-2 items-center pl-5"
              >
                <FaUser className="text-blue-700" />
                <p className="">Dashboard</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("index")}
                className="flex gap-2 items-center pl-5"
              >
                <FaCartShopping className="text-blue-700" />
                <p>Products</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("index")}
                className="flex gap-2 items-center pl-5"
              >
                <FaHeart className="text-blue-700" />
                <p>Wishlist</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("index")}
                className="flex gap-2 items-center pl-5"
              >
                <FaAddressCard className="text-blue-700" />
                <p>Address</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("index")}
                className="flex gap-2 items-center pl-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Payment</p>
              </Link>
            </li>
            {isAdmin && (
              <li className="hover:bg-blue-100 py-2">
                <Link
                  href={route("index")}
                  className="flex gap-2 items-center pl-5"
                >
                  <FaLock className="text-blue-700" />
                  <p>Admin</p>
                </Link>
              </li>
            )}
            {isProvider && (
              <li className="py-2">
                <button
                  onClick={handleProviderClick}
                  className="flex gap-2 items-center pl-5 "
                >
                  <FaHandshake className="text-blue-700" />
                  <p>Provider</p>
                </button>
                <ul
                  id="providerDropdown"
                  className={`py-2 text-lg space-y-2 flex-col ${
                    showProviderOptions ? "flex" : "hidden"
                  }`}
                >
                  <li className="hover:bg-blue-100 py-2">
                    <Link
                      href={route("profile.provider")}
                      className="flex gap-2 items-center pl-11"
                    >
                      <FaLock className="text-blue-700" />
                      <p>Add product</p>
                    </Link>
                  </li>
                  <li className="hover:bg-blue-100 py-2">
                    <Link
                      href={route("profile.provider")}
                      className="flex gap-2 items-center pl-11"
                    >
                      <FaLock className="text-blue-700" />
                      <p>See products</p>
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
          <div className="flex pb-4 pl-4 justify-start">
            <Link href={route("profile.edit")} className="">
              <FaGear className="text-blue-700 text-4xl" />
            </Link>
          </div>
        </nav>
        <div className="flex flex-col flex-1">
          <div className="my-4">
            <h1 className="text-4xl">Profile {pageName}</h1>
            <p className="text-gray-700">Welcom to the profile section</p>
          </div>
          <div className="bg-gray-200/60 rounded-xl px-10 py-10 flex-1 mb-14 flex flex-col mr-5">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
