import React from 'react'
import ProfileLayout from "@/Layouts/ProfileLayout";
import { Link } from '@inertiajs/react';
import { StlViewer } from 'react-stl-viewer';
import PrimaryButton from '@/Components/PrimaryButton';
import { BackButton } from '@/Components/Buttons';
export default function ({ auth, order, products }) {
    return (
        <ProfileLayout user={auth.user} pageName='Orders' pageSubtitle='Checkout the orders'>
            <BackButton href="profile.provider.orders" />
            <div className='flex flex-col min-h-full '>
                <div className='overflow-x-scroll'>
                    <h3 className='font-bold text-2xl'>Order #{order.id}</h3>
                    <div className='flex gap-5 my-6'>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div className='bg-white rounded p-6 shadow-lg min-w-[40vh]' key={product.id}>
                                    <section>
                                        <StlViewer modelProps={{ color: product.colorHex }} style={{ top: 0, left: 0, width: '100%', height: '30vh', }} orbitControls shadows url={product.file} />
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
        </ProfileLayout>
    )
}