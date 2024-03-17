import logo from "../../../public/logoWhite.svg";
import logoblue from "../../../public/logoBlue.svg";
import { GlowButton } from "./Buttons";
import Dropdown from "@/Components/Dropdown";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Link } from "@inertiajs/react";

const Navbar = ({
  user = null,
  sectionsBg = [],
  sectionsText = [],
  dynamicBackground = true,
  defaultBackgroundColor = "transparent",
  defaultTextColor = "white",
  className,
}) => {
  
  var isAdmin = false;
  
  if (user && user.hasOwnProperty('roles')) isAdmin = user.roles.some(role => role.name === 'admin'); 

  const [headerBgColor, setHeaderBgColor] = useState(
    dynamicBackground ? "transparent" : defaultBackgroundColor
  );

  const [headerTextColor, setHeaderTextColor] = useState(
    dynamicBackground ? "white" : defaultTextColor
  );

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    const threshold = 50;
    if (dynamicBackground) {
      if (scrollPosition > threshold) {
        setHeaderBgColor("white");
        setHeaderTextColor("var(--main-blue)");
      } else {
        setHeaderBgColor("transparent");
        setHeaderTextColor("white");
      }
      Object.values(sectionsBg).forEach((sectionBg, index) => {
        const section = Object.keys(sectionsBg)[index];
        const sectionDom = document.getElementById(section);
        if (sectionDom) {
          const sectionPosition = sectionDom.offsetTop;
          if (scrollPosition > sectionPosition) {
            setHeaderBgColor(sectionBg);
          }
        }
      });

      Object.values(sectionsText).forEach((sectionText, index) => {
        const section = Object.keys(sectionsText)[index];
        const sectionDom = document.getElementById(section);
        if (sectionDom) {
          const sectionPosition = sectionDom.offsetTop;
          if (scrollPosition > sectionPosition) {
            setHeaderTextColor(sectionText);
          }
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuStyle = {
    height: isMenuOpen ? "100vh" : "0",
    overflow: isMenuOpen ? "visible" : "hidden",
    transition: "height 0.3s ease-in-out",
    position: "absolute",
    left: 0,
    top: 0,
    width: "45%",
    zIndex: 1000,
  };

  return (
    <>
      <header
        className={`items-center flex flex-wrap py-2 px-10 w-full justify-between text-[${headerTextColor}] fixed top-0 z-30 bg-[${headerBgColor}] transition ease-in-out duration-500 ` + className}
      >
        <div className="flex flex-1 gap-5 items-center justify-start">
          {/* Hamburger */}
          <div className="lg:hidden">
            <button
              id="burger-icon"
              className="text-white focus:outline-none"
              onClick={toggleNavbar}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke={
                  headerBgColor === "white" ? "var(--main-blue)" : "white"
                }
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
          {/* Logo y Printhub con Link */}
          <Link
            href="/"
            className="text-4xl font-bold justify-start flex gap-8 items-center md:flex md:items-center"
          >
            <img src={headerBgColor === "white" ? logo : logoblue} alt="Logo" />
            PrintHub
          </Link>
        </div>
        <div className="hidden flex-1 justify-center lg:flex">
          {/*Menu links*/}
          <ul className="justify-center hidden md:flex md:[&>li>a]:px-4 md:[&>li>a]:py-2">
            <li>
              <Link
                href={route("scan")}
                className="block p-4 text-lg transition hover:text-[#a2c0f8]"
              >
                Scan
              </Link>
            </li>
            <li>
              <Link
                href={route("market")}
                className="block p-4 text-lg transition hover:text-[#a2c0f8]"
              >
                Market
              </Link>
            </li>
            <li>
              <Link
                href={route("about")}
                className="block p-4 text-lg transition hover:text-[#a2c0f8]"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={route("pricing")}
                className="block p-4 text-lg transition hover:text-[#a2c0f8]"
              >
                Pricing
              </Link>
            </li>
          </ul>
          <div id="burger" className="md:hidden cursor-pointer">
            <div className={`bg-${headerTextColor}`}></div>
            <div className={`bg-${headerTextColor}`}></div>
            <div className={`bg-${headerTextColor}`}></div>
          </div>
        </div>
        <div className="hidden flex-1 lg:flex justify-end items-center xl:gap-4 gap-2">
          {user ? (
            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md border border-slate-400">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        <div className="">
                        {user.avatar ? (
                            <img className="w-7 h-7" src={`/storage/avatars/${user.avatar}`} alt="Avatar" />
                        ) : (
                            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center content-center justify-center text-white text-xl font-bold">
                              {user.name[0].toUpperCase() + user.lastname[0].toUpperCase()}
                            </div>
                        )}
                        </div>
                        <p className="ms-2 font-medium">{user.name}</p>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <h3 className=" ms-4 text-sm text-slate-700 mt-3">ACCOUNT</h3>
                    <div className="flex items-center content-center justify-center mt-3 mb-3">  
                    
                        {user.avatar ? (
                            <img src={`/storage/avatars/${user.avatar}`} className="w-10 h-10 ms-4"alt="Avatar" />
                        ) : (
                            <div className="w-10 h-10 bg-blue-500 ms-4 rounded-full flex items-center content-center justify-center text-white text-2xl font-bold">
                              {user.name[0].toUpperCase() + user.lastname[0].toUpperCase()}
                            </div>
                        )}
                    
                      <div className="flex flex-col overflow-hidden">
                      <p class="ms-4 text-slate-700 font-bold">{user.name} {user.lastname}</p>
                      <p class="ms-4 text-slate-700 me-4 truncate">{user.email}</p>
                      </div>
                    </div>

                    <hr></hr>
                    <Dropdown.Link className="rounded" href={route("profile.dashboard")}>
                      Dashboard
                    </Dropdown.Link>
                    <Dropdown.Link className="rounded" href={route("profile.edit")}>
                      Profile
                    </Dropdown.Link>
                    
                    <Dropdown.Link className="rounded" href={route("user.cart")}>Cart</Dropdown.Link>
                    <Dropdown.Link className="rounded" href={route('profile.wishlist')}>Wishlist</Dropdown.Link>
                    <hr></hr>
                    {isAdmin && (<Dropdown.Link className="rounded" href={route('admin.dashboard')}>Admin Dashboard</Dropdown.Link>)}
                    {isAdmin && (<hr/>)}
                    <Dropdown.Link
                      href={route("logout")}
                      method="post"
                      as="button"
                      className="rounded text-red-700"
                    >
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
          ) : (
            <>
              <Link
                href={route("login")}
                className="transition duration-300 bg-blue-950 xl:px-8 px-4 py-2 text-white font-bold rounded-lg hover:bg-blue-900"
              >
                <i class="fas fa-sign-in-alt mr-2"></i> Login
              </Link>
              <Link
                href={route("register")}
                className="transition duration-300 bg-gray-200 xl:px-8 px-4 py-2 text-[var(--main-blue)] font-bold rounded-lg hover:bg-blue-900 hover:text-white"
              >
                <i class="fas fa-user-plus mr-2"></i> START PRINTING
              </Link>
            </>
          )}
        </div>

        {isMenuOpen && (
          <div className="lg:hidden w-full text-center" style={menuStyle}>
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-[var(--dark-gray)] border-r overflow-y-auto">
              <div className="flex items-center mb-8">
                <div className="flex items-center gap-5 mr-auto text-3xl font-bold leading-none">
                  <Link href="/">
                    <img src={logoblue} alt="Logo" />
                  </Link>
                  <span className="text-white text-4xl font-bold">
                    PrintHub
                  </span>
                </div>
                <button className="navbar-close" onClick={toggleNavbar}>
                  <svg
                    className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div>
                {/*Menu links*/}
                <ul>
                  {user && (
                    <li className="mb-1">
                      <span className="block p-4 text-2xl font-semibold text-white">
                        Welcome, {user.name}!
                      </span>
                    </li>
                  )}
                  <li className="mb-1">
                    <Link
                      href={route("index")}
                      className="block p-4 text-lg transition font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      className="block p-4 text-lg transition font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                      href={route("scan")}
                    >
                      Scan
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href={route("pricing")}
                      className="block p-4 text-lg transition font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      className="block p-4 text-lg transition font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                      href={route("market")}
                    >
                      Market
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      className="block p-4 text-lg transition font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                      href={route("about")}
                    >
                      About
                    </Link>
                  </li>
                  {user && (
                    <>
                      <li className="mb-1">
                        <Link
                          className="block p-4 text-lg transition font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                          href={route("profile.dashboard")}
                        >
                          Profile
                        </Link>
                    </li>
                    <li className="mb-1">
                        <Link
                          className="block p-4 text-lg transition font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                          href={route("user.cart")}
                        >
                          Cart
                        </Link>
                    </li>
                  </>
                  )}
                  {isAdmin && (
                    <li className="mb-1">
                      <Link
                        className="block p-4 text-lg transition font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                        href={route("admin.dashboard")}
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              <div className="mt-auto">
                <div className="pt-6 flex flex-col justify-center items-center gap-[20px]">
                  {user ? (
                    <Link
                      className="w-[40%] text-center  items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md bg-white text-red-700 focus:outline-none"
                      href={route("logout")}
                      method="post"
                      as="button"
                      type="button"
                    >
                      Logout
                    </Link>
                  ) : (
                    <>
                      <GlowButton href={route("login")} value="Login" />
                      <GlowButton
                        textColor="black"
                        backgroundColor="white"
                        href={route("register")}
                        value="Register"
                      />
                    </>
                  )}
                </div>
                <p className="my-4 text-xs text-center text-gray-400">
                  <span>PrintHub © - All rights reserved.</span>
                </p>
              </div>
            </nav>
            <div className="hidden lg:flex lg:justify-end">
              <div className="md:flex-1 md:items-center md:justify-end hidden lg:flex md:gap-2">
                <GlowButton
                  icon="fas fa-user-plus mr-2"
                  textColor="white"
                  backgroundColor="#21398a"
                  href="#"
                  value="Sign up"
                />
                <GlowButton
                  icon="fas fa-sign-in-alt mr-2"
                  backgroundColor="white"
                  textColor="#1d4ed8"
                  href="#"
                  value="Login"
                />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
Navbar.propTypes = {
  sectionsBg: PropTypes.object,
  sectionsText: PropTypes.object,
  dynamicBackground: PropTypes.bool,
  defaultBackgroundColor: PropTypes.string,
  defaultTextColor: PropTypes.string,
};

export default Navbar;
