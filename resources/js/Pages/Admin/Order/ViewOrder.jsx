import React from 'react'
import Dashboard from '../Dashboard'
import Pagination from "@/Components/Pagination";
import { Link } from '@inertiajs/react';
import { FaPlus } from 'react-icons/fa';
import { StlViewer } from 'react-stl-viewer';
import PrimaryButton from '@/Components/PrimaryButton';
import { IoMdArrowRoundBack } from 'react-icons/io';
export default function ({ order, products }) {
    return (
        <Dashboard pageName='Orders' pageSubtitle='Checkout the orders'>
            <Link
                href={route("admin.orders")}
                className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-start transition hover:bg-[#bbbbbb]"
            >
                <IoMdArrowRoundBack />
            </Link>
            <div className='flex flex-col min-h-full '>
                <div className='overflow-x-scroll'>
                    <h3 className='font-bold text-2xl'>Order #{order.id}</h3>
                    <div className='flex gap-5 my-6'>
                        {products.length > 0 ? (
                            products.map((product) => (

                                <div className='bg-white rounded p-6 shadow-lg min-w-[40vh]' key={product.id}>
                                    <section>
                                        {product.file ? (<StlViewer modelProps={{ color: product.colorHex }} style={{ top: 0, left: 0, width: '100%', height: '30vh', }} orbitControls shadows url={product.file} />) :
                                            (<Link href={"/market/product/" + product.id}><img className="w-full cursor-pointer transition ease-in delay-400 hover:scale-110" src={product.image} alt={product.name} /></Link>)}
                                    </section>
                                    <section>
                                        <p className='font-bold'>{product.name}</p>
                                        <p>Price: {product.price}$</p>
                                        <p>Color: {product.colorName}</p>
                                    </section>
                                    <div className='mt-5'>
                                        <Link href={"/market/product/" + product.id}><PrimaryButton>Check product</PrimaryButton></Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span>No products found.</span>
                        )}
                    </div>
                </div>
            </div>
        </Dashboard>
    )
}