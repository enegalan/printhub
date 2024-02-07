import { Link } from "@inertiajs/inertia-react";
import { StlViewer } from "react-stl-viewer";

export default function ProductCardMini({product, ...props}) {
    const {name, price, id} = product
  return (
    <div {...props} className="flex flex-col items-center justify-between py-10 border-x-2">
        <div>
        <Link href={route('product.show',id)}><StlViewer modelProps={{ color: '#1e40af' }} style={{top: 0,left: 0,width: '100%',height: '30vh',}} shadows url={product.file} /></Link>
        </div>
        <Link href={route('product.show',id)} className="text-blue-950 font-semibold hover:underline hover:text-black">{name}</Link>
        <h1 className="font-bold">{price}$</h1>
    </div>
  )
}
