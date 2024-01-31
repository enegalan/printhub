import ProfileLayout from "@/Layouts/ProfileLayout";
import { Link } from "@inertiajs/react";
import { IoMdArrowRoundBack } from "react-icons/io";
export default function ({ user, products = [] }) {
    return (
        <ProfileLayout pageName="Dashboard" pageSubtitle="Welcome to your profile" user={user}>
            <Link href={route('profile.orders')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-start transition hover:bg-[#bbbbbb]">
                <IoMdArrowRoundBack />
            </Link>
            <h3 className="z-10 text-xl lg:text-3xl font-semibold">Order #{products[0].orderId}</h3>
            <div className='mt-8 flex flex-wrap flex-row min-h-full overflow-y-auto gap-2 justify-center '>
                {products.map(function(product) {
                    return (
                        <>
                            <Link className="max-h-[375px]" key={`product_${product.id}`} href={`products/${product.id}`}>
                                <div className="flex justify-center items-center flex-col gap-5 bg-white rounded-lg shadow-md py-5 overflow-hidden">
                                    <img className="w-full h-full transition hover:scale-110" src={/* product.image */ "/images/imagen1.png"} />
                                    <p className="font-bold">{product.name}</p>
                                    <p className="text-gray-600">{product.price}$</p>
                                    <p className="text-gray-600">Amount: {product.amount}</p>
                                    <p className="text-gray-600">Color: {product.colorName}</p>
                                    <p className="text-gray-600">Material: {product.materialName}</p>

                                </div>
                            </Link>                        
                        </>
                    );
                })}
            </div>
        </ProfileLayout>
    )
}