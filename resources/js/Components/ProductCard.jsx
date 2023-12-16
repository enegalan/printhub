import { Button } from "./Buttons.jsx";
import PropTypes from "prop-types";

export default function ProductCard({image, title, price}){
    return (
        <div className="border relative z-10 max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-100 flex flex-col hover:[&>img]:scale-105">
            <div className="flex  justify-end pr-5 pt-5">
                <a href="#"><i className="text-xl fas fa-heart transition duration-500 text-[var(--main-blue)] hover:text-blue-900"></i></a>
            </div>
            <img className="w-full cursor-pointer transition ease-in delay-400" src={image} alt={title} />
            <div className="px-6 pt-4">
                <div className="flex justify-between font-bold text-xl mb-2">
                    <span>{title}</span>
                    <a href="#"><i className="text-xl fas fa-cart-plus transition duration-500 text-[var(--main-blue)] hover:text-blue-900"></i></a>
                </div>
                <hr />
            </div>
            <div className="px-6 pb-4 pt-2">
                <div className="text-[var(--main-blue)] font-bold text-xl mb-2">{price}€</div>
            </div>
            {/* TODO: If there is an offer show the discount amount */}
            <div className="px-6 pt-4 pb-4 flex-grow flex justify-center items-center">
                <Button href="#" value="See more" hoverBackgroundColor="var(--main-blue)" hoverTextColor="var(--white)" textColor="var(--main-blue)" borderColor="var(--main-blue)"/>
            </div>
        </div>
    );
}
ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};