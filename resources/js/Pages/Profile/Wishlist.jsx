import ProfileLayout from "@/Layouts/ProfileLayout";
import { Link } from "@inertiajs/react";
export default function ({ user, products = [] }) {
    return (
        <ProfileLayout pageName="Dashboard" pageSubtitle="Welcome to your profile" user={user}>
            <h3 className="z-10 text-xl lg:text-3xl font-semibold">Wishlist</h3>
            <div className='mt-8 flex flex-wrap flex-row min-h-full overflow-y-auto gap-2 justify-center '>
                {products.length > 0 ? products.map(function(product) {
                    return (
                        <>
                            <Link className="max-h-[375px]" key={`product_${product.id}`} href={`products/${product.id}`}>
                                <div className="flex justify-center items-center flex-col gap-5 bg-white rounded-lg shadow-md py-5 overflow-hidden">
                                    <img className="w-full h-full transition hover:scale-110" src={/* product.image */ "/images/imagen1.png"} />
                                    <p className="font-bold">{product.name}</p>
                                    <p className="text-gray-600">{product.price}€</p>
                                </div>
                            </Link>                        
                        </>
                    );
                }) : <p>No products found in your wishlist, please check out the <a className="text-[var(--main-blue)] hover:underline" href={route('market')}>market</a></p>}
            </div>
        </ProfileLayout>
    )
}