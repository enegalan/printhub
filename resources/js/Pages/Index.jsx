import '../App.css';

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles'
import Carousel from "nuka-carousel"

import NavBar from '../Components/NavBar';
import { Footer } from '../Components/Footer';
import ThreeBox from '../Components/threejs/ThreeBox';
import TextChanger from '../Components/TextChanger';
import { GlowButton, BouncingButton } from '../Components/Buttons';


import impresion1 from '../../../public/images/impresion1.jpg'
import impresion2 from '../../../public/images/impresion2.jpeg'
import impresion3 from '../../../public/images/impresion3.jpg'

import { InfoSection } from '../Components/sections/InfoSection'
import { NewsSection } from '../Components/sections/NewsSection';
import { AboutSection } from '../Components/sections/AboutSection';
import { PricingSection } from '../Components/sections/PricingSection';
import LatestProductsSection from '../Components/sections/LatestProductsSection';

function Index({ auth }) {
  
  return (
    <>
      <div className='overflow-hidden bg-[var(--light-grey)]'>
        <NavBar user={auth.user} sectionsBg={{ 'thanks': '--dark' }} sectionsText={{ 'thanks': 'white' }} />
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-r h-screen from-blue-900 to-blue-700 ">
          <div className='dotted_bg flex relative flex-col justify-center items-center'>
            
            <div className='flex flex-col items-center lg:flex-row content-center justify-evenly w-full'>
              <div className='flex flex-col items-center self-center text-center mt-[300px] lg:mt-0'>
                <p className='text-white animate-heartbeat text-2xl lg:text-5xl mb-2 lg:mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                  SCAN AND PRINT ANYTHING <strong className="text-4xl lg:text-7xl inline"><br></br>RIGHT NOW</strong>
                </p>
                <p className='z-10 flex gap-3 items-center text-white text-base lg:text-xl mt-2 lg:mt-5 mb-4 lg:w-2/3 self-center'>
                  Make your ideas become <TextChanger toRotate='["3D piece", "true"]' period={3000} />
                </p>
                <div className='mt-10'>
                  <GlowButton value="SCAN" image="/images/scan.png" imageClass="w-[20%] mr-5 invert" />
                </div>
              </div>
              <ThreeBox></ThreeBox>
            </div>
            <BouncingButton></BouncingButton>
          </div>
        </div>

        <div id="thanks" className='relative z-10 bg-[var(--light-grey)] pt-[75px]'>
          <p className='text-4xl lg:text-5xl text-center text-blue-800 font-bold relative mb-6 z-10'>
            Why 3D Printing?
          </p>
          <InfoSection />
        </div>

        <div className='relative z-10 bg-[var(--light-grey)]' style={{ position: 'relative' }}>
          <div className='container mx-auto' style={{ position: 'relative' }}>
            <Carousel
              autoplay={true}
              cellAlign='center'
              wrapAround={true}
              disableEdgeSwiping={true}
              renderBottomCenterControls={() => null}
              renderCenterLeftControls={({ previousSlide }) => (
                <button
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: '10px',
                    cursor: 'pointer',
                    fontSize: '36px',
                    color: 'white',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    filter: 'drop-shadow(0px 0px 4px #000000)',
                  }}
                  onClick={previousSlide}
                >
                  <i className='fas fa-angle-left'></i>
                </button>
              )}
              renderCenterRightControls={({ nextSlide }) => (
                <button
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    right: '10px',
                    cursor: 'pointer',
                    fontSize: '36px',
                    color: 'white',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    filter: 'drop-shadow(0px 0px 4px #000000)',
                  }}
                  onClick={nextSlide}
                >
                  <i className='fas fa-angle-right'></i>
                </button>
              )}
            >
              <img src={impresion1} style={{ width: '100%', height: '585px', display: 'block', marginTop: '80px' }} />
              <img src={impresion2} style={{ width: '100%', height: '585px', display: 'block', marginTop: '80px' }} />
              <img src={impresion3} style={{ width: '100%', height: '585px', display: 'block', marginTop: '80px' }} />
            </Carousel>
          </div>
        </div>

        <PricingSection />
        <AboutSection />
        <LatestProductsSection />
        <NewsSection />
        <Footer />
      </div>
    </>
  )
}

export default Index;