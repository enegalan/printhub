import {GlowButton} from "./Buttons.jsx";
import PropTypes from "prop-types";

export default function CardPieces({image, title,description,hashtag}){
    return (
        <div className="border relative z-10 max-w-sm rounded overflow-hidden shadow-lg bg-gray-100 flex flex-col hover:[&>img]:scale-105">
            <img className="w-full cursor-pointer transition ease-in delay-400" src={image} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-base text-blue-950">{description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                {hashtag.map((hashtag, index) => (
                    <span key={`hashtag-id-${index}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #{hashtag}
                    </span>
                ))}
            </div>
            <div className="px-6 pt-4 pb-4 flex-grow flex justify-center items-end">
                <GlowButton value="Download piece" />
            </div>
        </div>
    );
}
CardPieces.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    hashtag: PropTypes.arrayOf(PropTypes.string).isRequired,
};