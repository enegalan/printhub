import { Link } from "@inertiajs/inertia-react";

export default function ProductCardMini({product, ...props}) {
    const {name, price, id} = product
  return (
    <div {...props} className="flex flex-col items-center justify-between py-10 border-x-2">
        <div>
            <img src={'/images/imagen1.webp'} alt="Product"/>
        </div>
        <Link href={route('product.show',id)} className="text-blue-950 font-semibold hover:underline hover:text-black">{name}</Link>
        <h1 className="font-bold">{price}$</h1>
    </div>
  )
}
