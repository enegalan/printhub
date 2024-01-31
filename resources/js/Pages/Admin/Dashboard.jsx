import { Link } from "@inertiajs/react";
import logoBlue from "../../../../public/logoWhite.svg";
import gbBlue from "../../../../public/images/Blue-dotted-Background-images.jpg"
import { FaBox, FaWallet, FaHome, FaUsers } from "react-icons/fa";
import { FaCartShopping, FaLocationDot } from "react-icons/fa6";
import { AiFillDashboard } from "react-icons/ai";
import { IoIosColorPalette } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { BiSolidCategory } from "react-icons/bi";

import React from 'react';

export default function AdminLayout({ children, pageName = 'Admin Dashboard', pageSubtitle = 'Welcome to admin section' }) {

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
                href={route("index")}
                className="flex gap-2 items-center px-5"
              >
                <FaHome className="text-blue-700" />
                <p className="">Home</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.dashboard")}
                className="flex gap-2 items-center pl-5"
              >
                <AiFillDashboard className="text-blue-700" />
                <p className="">Dashboard</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.products")}
                className="flex gap-2 items-center pl-5"
              >
                <FaBox className="text-blue-700 text-base" />
                <p>Products</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.users")}
                className="flex gap-2 items-center pl-5"
              >
                <FaUsers className="text-blue-700" />
                <p>Users</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.orders")}
                className="flex gap-2 items-center pl-5"
              >
                <FaCartShopping className="text-blue-700" />
                <p>Orders</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.materials")}
                className="flex gap-2 items-center pl-5"
              >
                <FaWallet className="text-blue-700 text-base" />
                <p>Materials</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.colors")}
                className="flex gap-2 items-center pl-5"
              >
                <IoIosColorPalette className="text-blue-700 text-2xl" />
                <p>Colors</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.countries")}
                className="flex gap-2 items-center pl-5"
              >
                <TbWorld className="text-blue-700" />
                <p>Countries</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.regions")}
                className="flex gap-2 items-center pl-5"
              >
                <FaLocationDot className="text-blue-700" />
                <p>Regions</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.categories")}
                className="flex gap-2 items-center pl-5"
              >
                <BiSolidCategory className="text-blue-700" />
                <p>Categories</p>
              </Link>
            </li>
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
          <div className="my-4">
            <h1 className="text-4xl">{pageName}</h1>
            <p className="text-gray-700">{pageSubtitle}</p>
          </div>
          <div className="bg-gray-200/60 overflow-auto rounded-xl px-10 py-10 flex-1 mb-14 flex flex-col mr-5">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}