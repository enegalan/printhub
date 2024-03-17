import { BackButton } from "@/Components/Buttons";
import ProfileLayout from "@/Layouts/ProfileLayout";
import { Link } from "@inertiajs/react";
import { StlViewer } from 'react-stl-viewer';

export default function ({ auth, products = [] }) {
    return (
        <ProfileLayout pageName="Check order" pageSubtitle="Manage an order" user={auth.user}>
            <BackButton href="profile.orders" />
            <h3 className="z-10 text-xl lg:text-3xl font-semibold">Order #{products[0].orderId}</h3>
            <div className='mt-8 flex flex-wrap flex-row min-h-full overflow-y-auto gap-2 justify-center '>
                {products.map(function(product) {
                    return (
                        <>
                            <Link className="max-h-[375px]" key={`product_${product.id}`} href={`/market/product/${product.id}`}>
                                <div className="flex justify-center items-center flex-col gap-5 bg-white rounded-lg shadow-md py-5 overflow-hidden">
                                    <StlViewer modelProps={{ color: product.colorName }} style={{top: 0,left: 0,width: '100%',height: '30vh',}} shadows url={product.file} />
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