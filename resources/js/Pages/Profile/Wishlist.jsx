import ProfileLayout from "@/Layouts/ProfileLayout";
import { Link, router } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { StlViewer } from "react-stl-viewer";

import toast, { Toaster } from 'react-hot-toast';

export default function Wishlist({ user, products = [] }) {
    const handleDelete = (productId) => {
        openModal(productId);
    };

    const openModal = (productId) => {
        const confirmModalElement = document.getElementById('confirmModal');
        confirmModalElement.dataset.productId = productId;
        confirmModalElement.classList.remove('hidden');
    };

    const closeModal = () => {
        document.getElementById('confirmModal').classList.add('hidden');
    };

    const confirmModal = () => {
        const productId = document.getElementById('confirmModal').dataset.productId;
        closeModal();
        onDeleteProduct(productId);
    };

    const onDeleteProduct = (productId) => {
        try {
            router.delete('/profile/wishlist/delete/'+productId);
            toast.success('Product removed succesfully from cart');
        } catch (error) {
            toast.error('Error removing product from wishlist');
        }
    };

    return (
        <ProfileLayout pageName="Dashboard" pageSubtitle="Welcome to your profile" user={user}>
            <Toaster />
            <div id="confirmModal" className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 flex items-center justify-center hidden" data-product-id="">
                <div className="bg-white p-8 rounded shadow-md">
                    <p className="text-lg font-semibold mb-4">Are you sure you want to delete this from your wishlist?</p>
                    <div className="flex justify-center">
                        <PrimaryButton className="mr-2 bg-red-500" onClick={confirmModal}>Yes</PrimaryButton>
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                </div>
            </div>
            <h3 className="z-10 text-xl lg:text-3xl font-semibold">Wishlist</h3>
            <div className='my-8 py-4 flex flex-wrap flex-row min-h-full overflow-y-auto gap-6 justify-center '>
                {products.length > 0 ? products.map((product) => (
                    <div className="flex" key={`product_${product.id}`}>
                        <Link className="max-h-[375px]" href={`/market/products/${product.id}`}>
                            <div className="flex justify-center items-center flex-col gap-5 bg-white rounded-lg shadow-md py-5 overflow-hidden">
                                <StlViewer modelProps={{ color: '#1e40af' }} style={{ top: 0, left: 0, width: '50vh', height: '50vh', }} shadows url={product.file} />
                                <p className="font-bold">{product.name}</p>
                                <p className="text-gray-600">{product.price}€</p>
                            </div>
                        </Link>
                        <div className="border relative z-10 max-w-sm rounded-lg shadow-lg bg-gray-100 flex flex-col">
                            <button
                                className="absolute top-[-10px] right-[-10px] px-4 py-2 z-[100] text-white cursor-pointer bg-red-500 rounded-lg p-1 transition ease-in delay-400 hover:scale-105"
                                onClick={() => handleDelete(product.id)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                )) : <p>No products found in your wishlist, please check out the <a className="text-[var(--main-blue)] hover:underline" href="/market">market</a></p>}
            </div>
        </ProfileLayout>
    );
}