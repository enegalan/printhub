import { router } from '@inertiajs/react';

import { Button } from "./Buttons.jsx";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";
import { FaRegHeart, FaHeart, FaCartPlus } from "react-icons/fa";


export default function ProductCard({id, image, name, price, href}){
    function onAddCart(e) {
        router.post('/addcart/'+id);
    }
    return (
        <div className="border relative z-10 max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-100 flex flex-col hover:[&>img]:scale-105">
            <div className="flex  justify-end pr-5 pt-5">
                <Link href="">
                    <FaRegHeart className="text-xl fas fa-heart transition duration-500 text-[var(--main-blue)] hover:text-blue-900"/>
                </Link>
            </div>
            <div className="overflow-hidden">
                <Link href={href}>
                    <img className="w-full cursor-pointer transition ease-in delay-400 hover:scale-110" src={image} alt={name} />
                </Link>
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
                <div className="text-[var(--main-blue)] font-bold text-xl mb-2">{price}€</div>
            </div>
            {/* TODO: If there is an offer show the discount amount */}
            <div className="px-6 pt-4 pb-4 flex-grow flex justify-center items-center">
                <Button href={href} value="See more" hoverBackgroundColor="var(--main-blue)" hoverTextColor="var(--white)" textColor="var(--main-blue)" borderColor="var(--main-blue)"/>
            </div>
        </div>
    );
}
ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};