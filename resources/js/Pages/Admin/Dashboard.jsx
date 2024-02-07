import { Link } from "@inertiajs/react";
import logoBlue from "../../../../public/logoWhite.svg";
import gbBlue from "../../../../public/images/Blue-dotted-Background-images.jpg";
import { FaBox, FaLayerGroup, FaHome, FaUsers, FaBars } from "react-icons/fa";
import { FaCartShopping, FaLocationDot } from "react-icons/fa6";
import { AiFillDashboard } from "react-icons/ai";
import { IoIosColorPalette } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { BiSolidCategory } from "react-icons/bi";

import React, { useEffect } from "react";
import { useState } from "react";

export default function AdminLayout({
  children,
  pageName = "Admin Dashboard",
  pageSubtitle = "Welcome to admin section",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const NavLinks = [
    {
      link: route("index"),
      icon: FaHome,
      name: "Home",
    },
    {
      link: route("admin.dashboard"),
      icon: AiFillDashboard,
      name: "Dashboard",
    },
    {
      link: route("admin.products"),
      icon: FaBox,
      name: "Products",
    },
    {
      link: route("admin.users"),
      icon: FaUsers,
      name: "Users",
    },
    {
      link: route("admin.orders"),
      icon: FaCartShopping,
      name: "Orders",
    },
    {
      link: route("admin.materials"),
      icon: FaLayerGroup,
      name: "Materials",
    },
    {
      link: route("admin.colors"),
      icon: IoIosColorPalette,
      name: "Colors",
    },
    {
      link: route("admin.countries"),
      icon: TbWorld,
      name: "Countries",
    },
    {
      link: route("admin.regions"),
      icon: FaLocationDot,
      name: "Regions",
    },
    {
      link: route("admin.categories"),
      icon: BiSolidCategory,
      name: "Categories",
    },
  ];
  useEffect(() => {
    var parent = document.querySelector("#parent");
    parent.scrollTo(0, 0);
  }, []);
  return (
    <main className={`bg-[url('${gbBlue}')] bg-cover h-full`}>
      <div className="md:h-screen flex md:flex-row flex-col bg-white/30">
        <nav
          className={`md:w-52 flex flex-col justify-center max-md:px-4 ${isMenuOpen ? "md:hidden" : ""
            }`}
        >
          <div className="mt-4 flex justify-between md:justify-center">
            <Link href={route("index")}>
              <img src={logoBlue} alt="Logo" />
            </Link>
            <button
              onClick={toggleMenu}
              className="md:hidden text-3xl text-blue-700"
            >
              <FaBars />
            </button>
          </div>
          <ul
            className={`flex flex-col w-full max-md:justify-center max-md:items-center md:flex-col gap-2 md:mt-10 my-5 text-xl md:flex-1 flex-wrap ${isMenuOpen ? "block" : "hidden md:block"
              }`}
          >
            {NavLinks.map(({ link, icon: Icon, name }, index) => (
              <li
                key={index}
                className="flex justify-center hover:bg-blue-100 py-2 w-full md:block"
              >
                <Link href={link} className="flex gap-2 items-center px-5">
                  {Icon && <Icon className="text-blue-700 hidden md:block" />}
                  <p className="text-2xl md:text-xl">{name}</p>
                </Link>
              </li>
            ))}
            <div className="text-center mb-5 mt-12">
              <Link
                href={route("logout")}
                method="post"
                as="button"
                className="text-white hover:underline text-lg bg-blue-700 py-1 px-4 rounded font-bold"
              >
                Log out
              </Link>
            </div>
          </ul>
        </nav>
        <div className="flex flex-col flex-1 overflow-x-scroll">
          <div className="my-4">
            <h1 className="text-4xl">{pageName}</h1>
            <p className="text-gray-700">{pageSubtitle}</p>
          </div>
          <div
            id="parent"
            className="bg-gray-200/60 rounded-xl px-10 py-10 flex-1 mb-14 flex flex-col"
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
