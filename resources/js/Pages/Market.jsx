import '@/App.css';

import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react'

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';

import Carousel from "nuka-carousel";
import { DropdownCheckbox, SearchInput } from '@/Components/Inputs';
import OrderBy from '@/Components/OrderBy';

import ProductsSection from '@/Components/sections/ProductsSection';

import toast from 'react-hot-toast';

function Market({ auth, products = [], colors = [], categories = [] }) {
    const [categoriesFilter, setCategories] = useState([]);
    const [priceFilter, setPrice] = useState([]);
    const [arrivalFilter, setArrival] = useState([]);
    const [orderFilter, setOrder] = useState([]);
    const [searchFilter, setSearch] = useState([]);

    var categoryOptions = categories.map(category => ({
        id: category.id,
        label: category.name.charAt(0).toUpperCase() + category.name.slice(1)
    }));

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

    function sendFilters($page = []) {
        let currentPage = products.current_page;
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
            router.post('/market/filter?page=' + currentPage, { filters: newFilters }, { preserveState: true });
        }
    }

    const onSuccess = (message) => {
        toast.success(message);
    }
    const onError = (message) => {
        toast.error(message);
    }

    const headerImageStyle = { display: 'block', marginTop: '110px' }

    return (
        <div className='bg-[var(--light-grey)]'>
            <NavBar
                user={auth.user}
                dynamicBackground={false}
                defaultBackgroundColor='var(--main-blue)'
                defaultTextColor='white'
            />

            <header className='-mt-10 xl:-mt-24 xl:h-[75vh] relative overflow-hidden'>
                <Carousel
                    autoplay={true}
                    cellAlign='center'
                    wrapAround={true}
                    disableEdgeSwiping={true}
                    renderBottomCenterControls={() => null}
                    renderCenterLeftControls={({ previousSlide }) => <></>}
                    renderCenterRightControls={({ nextSlide }) => <></>}
                >
                    <img src='/images/banners/bestproductsforyou.png' style={headerImageStyle} />
                    <img src='/images/banners/innovativegoals.png' style={headerImageStyle} />
                    <img src='/images/banners/advantageai.png' style={headerImageStyle} />
                </Carousel>
            </header>

            <main id='market' className='flex flex-col xl:flex-row mb-64 xl:mt-16 mt-4 xl:mx-5 xl:gap-10'>
                <div className='max-xl:bg-white max-xl:p-2 max-xl:rounded xl:w-[235px] flex xl:flex-col mb-5 max-xl:justify-around gap-5 mx-2'>
                    <section className='flex flex-col gap-3'>
                        <h4 className='font-bold text-lg'>Category</h4>
                        <form className='flex' method="POST" action="">
                            <span onChange={onCategoryChange}>
                                <DropdownCheckbox name='categories' options={categoryOptions} />
                            </span>
                        </form>
                    </section>
                    <section className='flex flex-col gap-3'>
                        <h4 className='font-bold text-lg'>Price</h4>
                        <form method="POST" action="">
                            <ul className='flex flex-col gap-2' onChange={onPriceChange}>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="price" id="price1" value="0" />
                                    <label className='text-sm' htmlFor="price1">0 - 20 USD</label>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="price" id="price2" value="20" />
                                    <label className='text-sm' htmlFor="price2">20 - 50 USD</label>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="price" id="price3" value="50" />
                                    <label className='text-sm' htmlFor="price3">More than 50 USD</label>
                                </li>
                            </ul>
                        </form>
                    </section>
                    <section className='flex flex-col gap-3'>
                        <h4 className='font-bold text-lg'>New arrivals</h4>
                        <form method="POST" action="">
                            <ul className='flex flex-col gap-2' onChange={onArrivalsChange}>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="new_arrivals" id="new_arrivals1" value="30" />
                                    <label className='text-sm' htmlFor="new_arrivals1">Last 30 days</label>
                                </li>
                                <li className='flex gap-3 items-center'>
                                    <input className='rounded text-[var(--main-blue)]' type="checkbox" name="new_arrivals" id="new_arrivals2" value="90" />
                                    <label className='text-sm' htmlFor="new_arrivals2">Last 90 days</label>
                                </li>
                            </ul>
                        </form>
                    </section>
                </div>
                <div className='flex flex-col w-full xl:px-6 px-2'>
                    <div className='flex xl:gap-10 gap-4 items-center'>
                        <section className='w-full' onInput={onSearchChange}>
                            <SearchInput action="" placeholder='Search...' onChange={onSearchChange} />
                        </section>
                        <section className='self-end'>
                            <OrderBy options={{ 'lowhigh': 'Price: Low to High', 'highlow': 'Price: High to Low' }} onChange={onOrderByChange} />
                        </section>
                    </div>
                    <ProductsSection user={auth.user} onSuccess={onSuccess} onError={onError} products={products} colors={colors} />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Market;