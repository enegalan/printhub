import { Link } from "@inertiajs/react";
import logoBlue from "../../../../public/logoWhite.svg";
import gbBlue from "../../../../public/images/Blue-dotted-Background-images.jpg"
import { FaUser, FaHeart,FaWallet,FaAddressCard } from "react-icons/fa";
import { FaCartShopping, FaGear } from "react-icons/fa6";

export default function ProfileLayout({ children,pageName='Dashboard' }) {
  return (
    <main className={`bg-[url('${gbBlue}')] bg-cover`}>
      <div className="h-screen flex bg-white/30">
        <nav className="w-52 flex flex-col">
          <div className="p-2 flex justify-center">
            <img src={logoBlue} alt="Logo" />
          </div>
          <ul className="flex flex-col gap-2 mt-10 text-xl flex-1">
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.dashboard")}
                className="flex gap-2 items-center pl-5"
              >
                <FaUser className="text-blue-700" />
                <p className="">Dashboard</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.products")}
                className="flex gap-2 items-center pl-5"
              >
                <FaCartShopping className="text-blue-700" />
                <p>Products</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.users")}
                className="flex gap-2 items-center pl-5"
              >
                <FaHeart className="text-blue-700" />
                <p>Users</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.orders")}
                className="flex gap-2 items-center pl-5"
              >
                <FaAddressCard className="text-blue-700" />
                <p>Orders</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.materials")}
                className="flex gap-2 items-center pl-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Materials</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.colors")}
                className="flex gap-2 items-center pl-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Colors</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.countries")}
                className="flex gap-2 items-center pl-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Countries</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.regions")}
                className="flex gap-2 items-center pl-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Regions</p>
              </Link>
            </li>
          </ul>
          <div className="flex pb-4 pl-4 justify-start">
            <Link
              href={route("index")}
              className=""
            >
              <FaGear className="text-blue-700 text-4xl" />
            </Link>
          </div>
        </nav>
        <div className="flex flex-col flex-1">
          <div className="my-4">
            <h1 className="text-4xl">Admin {pageName}</h1>
            <p className="text-gray-700">Welcome to the admin section</p>
          </div>
          <div className="bg-gray-200/60 overflow-auto rounded-xl px-10 py-10 flex-1 mb-14 flex flex-col mr-5">
            <div className="">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}