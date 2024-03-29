import React, { useEffect, useState } from "react";
import ProductCard from "@/Components/ProductCard";
import Pagination from "@/Components/Pagination";

function ProductsSection({ user = null, products = [], colors = [], onSuccess, onError }) {
    const { data, prev_page_url, next_page_url, current_page, last_page } = products;

    const getWishlistStatus = async (productId) => {
        if (user) {
            try {
                const response = await axios.post(`/wishlist/product/${productId}/status`);
                const data = response.data === 1 ? 1 : 0;
                return data;
            } catch (error) {
                console.error(error);
                return false;
            }
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

            const updatedStatuses = wishlistStatuses.map(status => {
                if (status.productId === productId) {
                    return { ...status, isWishlistItem: !status.isWishlistItem };
                }
                return status;
            });

            setWishlistStatuses(updatedStatuses);

            const data = await response.json();
            onSuccess(data.message);
        } catch (error) {
            console.error(error);
            onError('Cannot update wishlist');
        }
    };

    return (
        <section id="products_section" className="relative z-10 bg-[var(--light-grey)]">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 mt-10 max-md:px-2">
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
                            image=""
                            file={product.file}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            href={`/market/product/${product.id}`}
                            colors={colors}
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