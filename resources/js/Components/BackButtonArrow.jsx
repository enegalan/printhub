import { Link } from "@inertiajs/react";

export default function BackButtonArrow({...props}){
    return (
        <div {...props} className='absolute top-10 left-12'>
            <Link className='text-4xl transition text-gray-500 hover:text-black hover:cursor-pointer' onClick={ () => window.history.back()}>
                <i className='fas fa-arrow-left'></i>
            </Link>
        </div>
);
}