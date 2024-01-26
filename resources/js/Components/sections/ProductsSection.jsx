import React from "react";

import ProductCard from "@/Components/ProductCard";
import Pagination from "@/Components/Pagination";

function ProductsSection({ products = [] }) {
    const { data, prev_page_url, next_page_url, current_page, last_page } = products;

    return (
        <section id="products_section" className="relative z-10 bg-[var(--light-grey)]">
            <div className="mt-10 pb-10 flex flex-wrap justify-center gap-4">
                {data.map((product) => (
                    <ProductCard key={product.id} image="/images/imagen1.png" id={product.id} name={product.name} price={product.price} href={"/market/product/"+product.id} />
                ))}
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