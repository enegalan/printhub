import { router } from '@inertiajs/react';

import { Button } from "./Buttons.jsx";
import PropTypes from "prop-types";
import { FaRegHeart, FaHeart, FaCartPlus } from "react-icons/fa";
import { useState } from 'react';
import { StlViewer } from 'react-stl-viewer';

export default function ProductCard({id, image, file, name, price, href, onSuccess, onError, isWishlistItem, onAddWishlist, colors}){
    const [isInWishlist, setIsInWishlist] = useState(isWishlistItem);
    function onAddWishlist (e) {
        try {
            router.post('/add/wishlist/'+id);
            setIsInWishlist(!isInWishlist);
        } catch (error) {
            onError('Cannot add product to cart');
        } finally {
            onSuccess('Product added successfully to cart');
        }
    }

    
    function onAddCart(e) {
        try {
            router.post('/addcart/'+id);
        } catch (error) {
            onError('Cannot add product to cart');
        } finally {
            onSuccess('Product added successfully to cart');
        }
    }
    return (
        <>
            <div className="border relative z-10 max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-100 flex flex-col hover:[&>img]:scale-105">
            
            <div className="flex  justify-end pr-5 pt-5">
            <div value={id} className="hover:cursor-pointer" onClick={onAddWishlist}>
                    {(isWishlistItem || isInWishlist ? (
                        <FaHeart className="text-xl fas fa-heart transition duration-500 text-[var(--main-blue)] hover:text-blue-900" />
                    ) : (
                        <FaRegHeart className="text-xl fas fa-heart transition duration-500 text-[var(--main-blue)] hover:text-blue-900" />
                    ))}
                </div>
            </div>
            <div className="overflow-hidden">
                <StlViewer modelProps={{ color: '#1e40af' }} style={{top: 0,left: 0,width: '100%',height: '30vh',}} url={file} />
            </div>
            <div className="px-6 pt-4">
                <div className="flex justify-between font-bold text-xl mb-2 gap-2">
                    <span>{name}</span>
                    <div value={id} className="hover:cursor-pointer" onClick={onAddCart}>
                        <FaCartPlus className="text-2xl fas fa-cart-plus transition duration-500 text-[var(--main-blue)] hover:text-blue-900"/>
                    </div>
                </div>
                <hr />
            </div>
            <div className="px-6 pb-4 pt-2">
                <div className="text-[var(--main-blue)] font-bold text-xl mb-2">{price}$</div>
            </div>
            {/* TODO: If there is an offer show the discount amount */}
            <div className="px-6 pt-4 pb-4 flex-grow flex justify-center items-center">
                <Button href={href} value="See more" hoverBackgroundColor="var(--main-blue)" hoverTextColor="var(--white)" textColor="var(--main-blue)" borderColor="var(--main-blue)"/>
            </div>
        </div>
        </>
        
    );
}
ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};