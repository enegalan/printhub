
import piece from '../../../../public/images/imagen1.png';

import ProductCard from "@/Components/ProductCard";
export default function LatestProductsSection(){
    const marketProducts = [
        {
            image: piece,
            title: "Reviving Retro PCs",
            price: 5.99,
        },
        {
            image: piece,
            title: "Another Title",
            price: 5.99,
        },
        {
            image: piece,
            title: "One More Title",
            price: 5.99,
        },
        {
            image: piece,
            title: "One More Title",
            price: 5.99,
        },
    ];
    return(
        <section id="partsSectionIndex" className="relative z-10 bg-[var(--light-grey)] pt-20">
            <div className="mx-2 flex flex-col items-center">
                <h1 className="text-3xl text-blue-800">GET THE HIGHEST QUALITY FOR YOUR 3D PARTS</h1>
                <h1 className="text-4xl font-bold text-blue-800">WITH THE BEST SERVICE</h1>
            </div>
            <div className="mt-10 pb-10 grid justify-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-4 md:mx-20 mx-3">
                {marketProducts.map((item, index) => (
                    <ProductCard
                        key={index}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                    />
                ))}
            </div>
        </section>
    )
}