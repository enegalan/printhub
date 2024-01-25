import { Link } from "@inertiajs/inertia-react";

export default function ProductCardMini({product, ...props}) {
    const {name, image, description, price, id} = product
  return (
    <div {...props} className="flex flex-col items-center justify-between py-10 border-x-2">
        <div>
            <img src={'/images/imagen1.png'} alt="Product image" className="" />
        </div>
        <Link href={route('product.show',id)} className="text-sky-600 hover:underline hover:text-black">{name}</Link>
        <h1>{price}</h1>
    </div>
  )
}
