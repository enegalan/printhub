import '@/App.css';

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles'
import Carousel from "nuka-carousel"

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';
import ThreeBox from '@/Components/threejs/ThreeBox';
import { TypeAnimation } from 'react-type-animation';
import { GlowButton, BouncingButton } from '@/Components/Buttons';

import { InfoSection } from '@/Components/sections/InfoSection'
import { NewsSection } from '@/Components/sections/NewsSection';
import { AboutSection } from '@/Components/sections/AboutSection';
import { PricingSection } from '@/Components/sections/PricingSection';
import LatestProductsSection from '@/Components/sections/LatestProductsSection';

function Index({ auth, roles }) {
  return (
    <>
      <div className='overflow-hidden bg-[var(--light-grey)]'>
        <NavBar user={auth.user} roles={roles} sectionsBg={{ 'thanks': '--dark' }} sectionsText={{ 'thanks': 'white' }} />
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-r h-screen from-blue-900 to-blue-700 ">
          <div className='dotted_bg flex relative flex-col justify-center items-center'>
            <div className='flex flex-col items-center lg:flex-row content-center justify-evenly w-full'>
              <div className='flex flex-col items-center self-center text-center mt-[300px] lg:mt-0'>
                <p className='text-white animate-heartbeat text-2xl lg:text-5xl mb-2 lg:mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                  SCAN AND PRINT ANYTHING <strong className="text-4xl lg:text-7xl inline"><br></br>RIGHT NOW</strong>
                </p>
                <p className='z-10 flex gap-3 items-center text-white text-base lg:text-xl mt-2 lg:mt-5 mb-4 lg:w-2/3 self-center'>
                  Make your ideas become 
                  <span className='bg-[#00000052] p-1 rounded min-w-[85px] block w-[110px] h-[35px]'>
                    <TypeAnimation sequence={["3D piece", "true"]} speed={400} deletionSpeed={400} loop repeat={Infinity}/>
                  </span>
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
                    top: '55%',
                    transform: 'translateY(-55%)',
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
                    top: '55%',
                    transform: 'translateY(-55%)',
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
              <img src="/images/impresion1.jpg" style={{ width: '100%', height: '650px', display: 'block', marginTop: '80px' }} />
              <img src="/images/impresion2.jpeg" style={{ width: '100%', height: '650px', display: 'block', marginTop: '80px' }} />
              <img src="/images/impresion3.jpg" style={{ width: '100%', height: '650px', display: 'block', marginTop: '80px' }} />
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