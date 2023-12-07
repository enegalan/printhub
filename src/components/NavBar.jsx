import logo from '/logoWhite.svg'
import logoblue from '/logoBlue.svg'
import '../App.css'; // Import the stylesheet with the animation styles
import { GlowButton } from './Buttons';

import { useEffect, useState } from 'react';
import PropTypes from "prop-types";

const Navbar = ({ sectionsBg, sectionsText }) => {
  sectionsBg = sectionsBg ? sectionsBg : [];
  sectionsText = sectionsText ? sectionsText : [];

  const [headerBgColor, setHeaderBgColor] = useState('transparent');
  const [headerTextColor, setHeaderTextColor] = useState('white');

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    const threshold = 50;
    if (scrollPosition > threshold) {
      setHeaderBgColor('white');
      setHeaderTextColor('--main-blue');
    } else {
      setHeaderBgColor('transparent');
      setHeaderTextColor('white');
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuStyle = {
    height: isMenuOpen ? '100vh' : '0',
    overflow: isMenuOpen ? 'visible' : 'hidden',
    transition: 'height 0.3s ease-in-out',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '45%',
    zIndex: 1000,
  };

  return (
    <>
      <header className={`items-center flex flex-wrap py-2 md:px-20 px-10 w-full justify-between text-[${headerTextColor}] fixed top-0 z-30 bg-[${headerBgColor}] transition ease-in-out duration-500`}>
        <div className="justify-start flex gap-8 items-center md:flex md:items-center">
          {<img src={headerBgColor === 'white' ? logo : logoblue} alt="Logo" />}
          <a href="/" className="text-4xl font-bold">PrintHub</a>
        </div>

        <div className="lg:hidden ml-auto">
          <button
            id="burger-icon"
            className="text-white focus:outline-none"
            onClick={toggleNavbar}
          >
            <svg className="h-6 w-6" fill="none" stroke={headerBgColor === 'white' ? "--main-blue" : "white"} viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex" >
          {/*Menu links*/}
          <ul className="justify-center hidden md:flex md:[&>li>a]:px-4 md:[&>li>a]:py-2">
            <li><a href="#" className='block p-4 text-lg hover:text-[#a2c0f8]'>Scan</a></li>
            <li><a href="#" className='block p-4 text-lg hover:text-[#a2c0f8]'>Shop</a></li>
            <li><a href="#" className='block p-4 text-lg hover:text-[#a2c0f8]'>About</a></li>
          </ul>
          <div id="burger" className="md:hidden cursor-pointer">
              <div className={`bg-${headerTextColor}`}></div>
              <div className={`bg-${headerTextColor}`}></div>
              <div className={`bg-${headerTextColor}`}></div>
          </div>
        </div >

        <div className="hidden lg:flex justify-center items-center gap-[5px]">
          <GlowButton href="/auth/login" value="Login" />
          <GlowButton textColor="black" backgroundColor="white" href="/auth/login" value="Register" />
        </div>

        {isMenuOpen && (
        <div className="lg:hidden w-full text-center" style={menuStyle} >
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-[var(--dark-gray)] border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <a className="flex items-center gap-5 mr-auto text-3xl font-bold leading-none" href="/">
                {<img src={logoblue} alt="Logo" />}
                <span href="/" className="text-white text-4xl font-bold">PrintHub</span>
              </a>
              <button className="navbar-close" onClick={toggleNavbar}>
                <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div>
              {/*Menu links*/}
              <ul>
                <li className="mb-1">
                  <a className="block p-4 text-lg font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded" href="#">Home</a>
                </li>
                <li className="mb-1">
                  <a className="block p-4 text-lg font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded" href="#">Scan</a>
                </li>
                <li className="mb-1">
                  <a className="block p-4 text-lg font-semibold text-gray-400 hover:bg-blue-50 hover:text-[--blue-1] rounded" href="#">Market</a>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6 flex flex-col justify-center items-center gap-[20px]">
                <GlowButton href="/auth/login" value="Login" />
                <GlowButton textColor="black" backgroundColor="white" href="/auth/login" value="Register" />
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <span>PrintHub © - All rights reserved.</span>
              </p>
            </div>
          </nav>
          <div className="hidden lg:flex lg:justify-end">
            <div className="md:flex-1 md:items-center md:justify-end hidden lg:flex md:gap-2">
              <GlowButton icon="fas fa-user-plus mr-2" textColor="white" backgroundColor="#21398a" href="#" value="Sign up" />
              <GlowButton icon="fas fa-sign-in-alt mr-2" backgroundColor="white" textColor="#1d4ed8" href="#" value="Login" />
            </div>
          </div>
        </div>
        )}
      </header>
    </>
  )
}
Navbar.propTypes = {
  sectionsBg: PropTypes.array,
  sectionsText: PropTypes.array,
};

export default Navbar;
