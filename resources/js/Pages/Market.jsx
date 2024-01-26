import '@/App.css';

import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react'

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';

import Carousel from "nuka-carousel";
import { DropdownCheckbox, SearchInput } from '@/Components/Inputs';
import OrderBy from '@/Components/OrderBy';

import ProductsSection from '@/Components/sections/ProductsSection';

import toast, { Toaster } from 'react-hot-toast';

function Market({ auth, products = [] }) {
    const [categoriesFilter, setCategories] = useState([]);
    const [priceFilter, setPrice] = useState([]);
    const [arrivalFilter, setArrival] = useState([]);
    const [orderFilter, setOrder] = useState([]);
    const [searchFilter, setSearch] = useState([]);

    useEffect(() => {
        sendFilters();
    }, [categoriesFilter, priceFilter, arrivalFilter, orderFilter, searchFilter]);

    function onCategoryChange(event) {
        const categoryValue = event.target.value;
        // Check if the value is already in the array
        if (categoriesFilter.includes(categoryValue)) {
            // If it is, remove it
            setCategories(categoriesFilter.filter((value) => value !== categoryValue));
        } else {
            // If it is not, add it to the array
            setCategories([...categoriesFilter, categoryValue]);
        }
    }

    function onPriceChange(event) {
        const price_interval = event.target.value;

        // Si el precio ya está presente, deselección
        if (priceFilter.includes(price_interval)) {
            setPrice(priceFilter.filter((value) => value !== price_interval));
        } else {
            // Si no está presente, selección o deselección
            setPrice((prevPriceFilter) => {
                // Si el precio ya estaba seleccionado, deselección
                if (prevPriceFilter.includes(price_interval)) {
                    return prevPriceFilter.filter((value) => value !== price_interval);
                }
                // Si el precio no estaba seleccionado, selección
                return [...prevPriceFilter, price_interval];
            });
        }
    }

    function onArrivalsChange(event) {
        const arrivalValue = event.target.value;
        // Check if the value is already in the array
        if (arrivalFilter.includes(arrivalValue)) {
            // If it is, remove it
            setArrival(arrivalFilter.filter((value) => value !== arrivalValue));
        } else {
            // If it is not, add it to the array
            setArrival([...arrivalFilter, arrivalValue]);
        }
    }

    function onOrderByChange(event) {
        const order = event;
        setOrder(order);
    }

    function onSearchChange(event) {
        const search = event.target.value;
        setSearch(search);
    }

    function sendFilters() {
        const newFilters = {
            categories: categoriesFilter,
            price: priceFilter,
            arrival: arrivalFilter.length != 0 ? arrivalFilter : '%',
            order: orderFilter.length != 0 ? orderFilter : '%',
            search: searchFilter.length != 0 ? searchFilter : '%',
        };
        
        const filteredFilters = Object.fromEntries(
            Object.entries(newFilters).filter(([_, value]) => value.length > 0)
        );

        if (Object.keys(filteredFilters).length > 0) {
            router.post('/market/filter', { filters: newFilters }, { preserveState: true });
        }
    }

    const onSuccess = () => {
        toast.success('Product added to cart successfully');
    }
    const onError = () => {
        toast.error('Cannot add product to cart');
    }

    return (
        <>
            <NavBar
                user={auth.user}
                dynamicBackground={false}
                defaultBackgroundColor='var(--main-blue)'
                defaultTextColor='white'
            />
            <Toaster />

            <header className='-mt-24 h-[550px] relative overflow-hidden'>
                <Carousel
                    autoplay={true}
                    cellAlign='center'
                    wrapAround={true}
                    disableEdgeSwiping={true}
                    renderBottomCenterControls={() => null}
                    renderCenterLeftControls={({ previousSlide }) => <></>}
                    renderCenterRightControls={({ nextSlide }) => <></>}
                >
                    <img src='/images/impresion1.jpg' style={{ width: '100%', height: '650px', display: 'block', marginTop: '80px', objectFit: 'cover' }} />
                </Carousel>
            </header>

            <main id='market' className='flex mb-64 mt-16 mx-5 gap-10'>
                <div className='w-[235px] flex flex-col gap-5'>
                    <section className='flex flex-col gap-3'>
                        <h4 className='font-bold text-lg'>Category</h4>
                        <form className='flex' method="POST" action="">
                            <span onChange={onCategoryChange}>
                                <DropdownCheckbox name='categories' options={[{ id: 1, 'label': 'Decoration' }, { id: 2, 'label': 'Spares' }]} />
                            </span>
                        </form>
                    </section>
                    <section className='flex flex-col gap-3'>
                        <h4 className='font-bold text-lg'>Price</h4>
                        <form method="POST" action="">
                            <ul className='flex flex-col gap-2' onChange={onPriceChange}>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="price" value="0" />
                                    <label className='text-sm' htmlFor="price">0 - 20 EUR</label>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="price" value="20" />
                                    <label className='text-sm' htmlFor="price">20 - 50 EUR</label>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="price" value="50" />
                                    <label className='text-sm' htmlFor="price">More than 50 EUR</label>
                                </li>
                            </ul>
                        </form>
                    </section>
                    <section className='flex flex-col gap-3'>
                        <h4 className='font-bold text-lg'>New arrivals</h4>
                        <form method="POST" action="">
                            <ul className='flex flex-col gap-2' onChange={onArrivalsChange}>
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

                <div className='flex flex-col w-full px-6'>
                    <div className='flex gap-10 items-center'>
                        <section className='w-full' onInput={onSearchChange}>
                            <SearchInput action="" placeholder='Search...' onChange={onSearchChange} />
                        </section>
                        <section className='self-end'>
                            <OrderBy options={{ 'lowhigh' : 'Price: Low to High', 'highlow' : 'Price: High to Low' }} onChange={onOrderByChange} />
                        </section>
                    </div>
                    <ProductsSection onSuccess={onSuccess} onError={onError} products={products} />
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Market;