import '@/App.css';

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';

import Carousel from "nuka-carousel"

function Market({ auth }) {
    return (
        <>
            <NavBar user={auth.user} sectionsBg={{ 'market': '--dark' }} sectionsText={{ 'market': 'white' }} />

            <main id="market">
                <header className='-mt-24 h-48 relative overflow-hidden'>
                    <Carousel
                        autoplay={true}
                        cellAlign='center'
                        wrapAround={true}
                        disableEdgeSwiping={true}
                        renderBottomCenterControls={() => null}
                        renderCenterLeftControls={({ previousSlide }) => (
                            <></>
                        )}
                        renderCenterRightControls={({ nextSlide }) => (
                            <></>
                        )}
                    >
                        <img src='/images/impresion1.jpg' style={{ width: '100%', height: '650px', display: 'block', marginTop: '80px' }} />
                    </Carousel>
                </header>
            </main>

            <Footer />
        </>
    );
}

export default Market;