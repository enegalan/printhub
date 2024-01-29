import React, { useEffect, useState } from "react";
import ProductCard from "@/Components/ProductCard";
import Pagination from "@/Components/Pagination";
import toast, { Toaster } from 'react-hot-toast';
import { router } from '@inertiajs/react'

function ProductsSection({ products = [], onSuccess, onError }) {
    const { data, prev_page_url, next_page_url, current_page, last_page } = products;

    const getWishlistStatus = async (productId) => {
        try {
            const response = await axios.post(`/wishlist/product/${productId}/status`);
            const data = response.data === 1 ? 1 : 0;
            return data;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const [wishlistStatuses, setWishlistStatuses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const statuses = await Promise.all(data.map(async (product) => {
                const isWishlistItem = await getWishlistStatus(product.id);
                return { productId: product.id, isWishlistItem };
            }));
            setWishlistStatuses(statuses);
        };

        fetchData();
    }, [data]);

    const onAddWishlist = async (productId) => {
        try {
            const response = await fetch(`/add/wishlist/${productId}`, {
                method: 'POST',
            });

            // Actualizar el estado de la wishlist después de la acción
            const updatedStatuses = wishlistStatuses.map(status => {
                if (status.productId === productId) {
                    return { ...status, isWishlistItem: !status.isWishlistItem };
                }
                return status;
            });

            setWishlistStatuses(updatedStatuses);

            const data = await response.json();
            onSuccess(data.message); // Ajusta esto según la estructura de tu respuesta del servidor
        } catch (error) {
            console.error(error);
            onError('Cannot update wishlist');
        }
    };

    return (
        <section id="products_section" className="relative z-10 bg-[var(--light-grey)]">
            <div className="mt-10 pb-10 flex flex-wrap justify-center gap-4">
                {data.map((product) => {
                    const wishlistStatus = wishlistStatuses.find(status => status.productId === product.id);
                    const isWishlistItem = wishlistStatus ? wishlistStatus.isWishlistItem : false;
                    return (
                        <ProductCard
                            key={product.id}
                            onSuccess={onSuccess}
                            onError={onError}
                            isWishlistItem={isWishlistItem}
                            onAddWishlist={() => onAddWishlist(product.id)}
                            image="/images/imagen1.png"
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            href={`/market/product/${product.id}`}
                        />
                    );
                })}
            </div>
            <Pagination
                prevPageUrl={prev_page_url}
                nextPageUrl={next_page_url}
                currentPage={current_page}
                totalPages={last_page}
            />
        </section>
    );
}

export default ProductsSection;