import logo from "../../../public/logoWhite.svg";
import logoblue from "../../../public/logoBlue.svg";
import "../App.css"; // Import the stylesheet with the animation styles
import { GlowButton } from "./Buttons";
import Dropdown from "@/Components/Dropdown";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Link } from "@inertiajs/react";

const Navbar = ({ user, sectionsBg, sectionsText }) => {
  sectionsBg = sectionsBg ? sectionsBg : [];
  sectionsText = sectionsText ? sectionsText : [];

  const [headerBgColor, setHeaderBgColor] = useState("transparent");
  const [headerTextColor, setHeaderTextColor] = useState("white");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    const threshold = 50;
    if (scrollPosition > threshold) {
      setHeaderBgColor("white");
      setHeaderTextColor("--main-blue");
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
        className={`items-center flex flex-wrap py-2 px-10 w-full justify-between text-[${headerTextColor}] fixed top-0 z-30 bg-[${headerBgColor}] transition ease-in-out duration-500`}
      >
        <div className="flex gap-5 items-center">
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
          <div className="justify-start flex gap-8 items-center md:flex md:items-center">
            {
              <img
                src={headerBgColor === "white" ? logo : logoblue}
                alt="Logo"
              />
            }
            <a href="/" className="text-4xl font-bold">
              PrintHub
            </a>
          </div>
        </div>
        <div className="hidden lg:flex">
          {/*Menu links*/}
          <ul className="justify-center hidden md:flex md:[&>li>a]:px-4 md:[&>li>a]:py-2">
            <li>
              <a
                href={route("dashboard")}
                className="block p-4 text-lg hover:text-[#a2c0f8]"
              >
                Scan
              </a>
            </li>
            <li>
              <a href="#" className="block p-4 text-lg hover:text-[#a2c0f8]">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="block p-4 text-lg hover:text-[#a2c0f8]">
                About
              </a>
            </li>
          </ul>
          <div id="burger" className="md:hidden cursor-pointer">
            <div className={`bg-${headerTextColor}`}></div>
            <div className={`bg-${headerTextColor}`}></div>
            <div className={`bg-${headerTextColor}`}></div>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center gap-[5px]">
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
                        <strong>{user.name[0]}</strong>
                        <svg
                          className="ms-2 -me-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <p class="ms-4 text-slate-700">{user.name}</p>
                    <p class="ms-4 text-slate-700">{user.email}</p>
                    <hr></hr>
                    <Dropdown.Link href={route("profile.edit")}>
                      Profile
                    </Dropdown.Link>
                    <Dropdown.Link
                      href="#"
                    >
                      Cart
                    </Dropdown.Link>
                    <Dropdown.Link
                      href="#"
                    >
                      Wishlist
                    </Dropdown.Link>
                    <Dropdown.Link
                      href={route("logout")}
                      method="post"
                      as="button"
                    >
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
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

        {isMenuOpen && (
          <div className="lg:hidden w-full text-center" style={menuStyle}>
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-[var(--dark-gray)] border-r overflow-y-auto">
              <div className="flex items-center mb-8">
                <a
                  className="flex items-center gap-5 mr-auto text-3xl font-bold leading-none"
                  href="/"
                >
                  {<img src={logoblue} alt="Logo" />}
                  <span href="/" className="text-white text-4xl font-bold">
                    PrintHub
                  </span>
                </a>
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
                      <span class="block p-4 text-2xl font-semibold text-white">
                        Welcome, {user.name}!
                      </span>
                    </li>
                  )}
                  <li className="mb-1">
                    <a
                      className="block p-4 text-lg font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                      href="#"
                    >
                      Home
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-lg font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                      href="#"
                    >
                      Scan
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-lg font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                      href="#"
                    >
                      Market
                    </a>
                  </li>
                  {user && (
                    <li className="mb-1">
                      <a
                        className="block p-4 text-lg font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded"
                        href={route("profile.edit")}
                      >
                        Profile
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <div className="mt-auto">
                <div className="pt-6 flex flex-col justify-center items-center gap-[20px]">
                  {user ? (
                    <Link
                      className="w-[40%] text-center  items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-white text-gray-700 focus:outline-none"
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
  sectionsBg: PropTypes.array,
  sectionsText: PropTypes.array,
};

export default Navbar;
