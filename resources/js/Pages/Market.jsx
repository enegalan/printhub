import '@/App.css';

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';

import Carousel from "nuka-carousel";
import { DropdownCheckbox } from '@/Components/Inputs';
import OrderBy from '@/Components/OrderBy';

import ProductsSection from '@/Components/sections/ProductsSection';

function Market({ auth, products = [] }) {
    return (
        <>
            <NavBar user={auth.user} sectionsBg={{ 'market': '--dark' }} sectionsText={{ 'market': 'white' }} />

            <header className='-mt-24 h-[550px] relative overflow-hidden'>
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
                    <img src='/images/impresion1.jpg' style={{ width: '100%', height: '650px', display: 'block', marginTop: '80px', objectFit: 'cover' }} />
                </Carousel>
            </header>

            <main id="market" className='flex mb-64 mt-16 mx-5 gap-10'>
                {/* Left side - Filter by */}
                <div className='w-[235px] flex flex-col gap-5'>
                    <section className='flex flex-col gap-3'>
                        <h4 className='font-bold text-lg'>Category</h4>
                        <form className='flex' method="POST" action="">
                            <DropdownCheckbox options={[{ id: 1, 'label': 'Decoration' }, { id: 2, 'label': 'Spares' }]} />
                        </form>
                    </section>
                    <section className='flex flex-col gap-3'>
                        <h4 className='font-bold text-lg'>Price</h4>
                        <form method="POST" action="">
                            <ul className='flex flex-col gap-2'>
                                {/* Set inputs values like if they were intervals. Example: 0-20, 30-50... */}
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="price" value="0-20" />
                                    <label className='text-sm' htmlFor="price">0 - 20 EUR</label>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="price" value="20-50" />
                                    <label className='text-sm' htmlFor="price">20 - 50 EUR</label>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="price" value="20-50" />
                                    <label className='text-sm' htmlFor="price">More than 50 EUR</label>
                                </li>
                            </ul>
                        </form>
                    </section>
                    <section className='flex flex-col gap-3'>
                        <h4 className='font-bold text-lg'>New arrivals</h4>
                        <form method="POST" action="">
                            <ul className='flex flex-col gap-2'>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="new_arrivals" value="30" />
                                    <label className='text-sm' htmlFor="new_arrivals">Last 30 days</label>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="new_arrivals" value="90" />
                                    <label className='text-sm' htmlFor="new_arrivals">Last 90 days</label>
                                </li>
                            </ul>
                        </form>
                    </section>
                </div>
                
                {/* Right side */}
                <div className='flex flex-col w-full px-6'>
                    {/* Order by */}
                    <section className='self-end'>
                        <OrderBy options={['Featured', 'Price: Low to High', 'Price: High to Low', 'Avg. Customer Review', 'Newest Arrivals', 'Best Sellers']} />
                    </section>
                    <ProductsSection products={products} />
                </div>
                
            </main>

            <Footer />
        </>
    );
}

export default Market;