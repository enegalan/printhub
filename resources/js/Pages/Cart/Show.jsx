import '@/App.css';

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';

import { Link } from '@inertiajs/inertia-react';
import ProductCard from './ProductCard';
import { useState } from "react";

function Cart({ auth, cart, materials, colors }) {


    const [cartItems, setCartItems] = useState(cart.stock_carts);

    const handleProductChange = (productId, updatedData) => {
        const updatedCartItems = cartItems.map((item) =>
          item.id === productId ? { ...item, ...updatedData } : item
        );
        setCartItems(updatedCartItems);
      };

    const orderTotal = cartItems.reduce((total, stockItem) => total + stockItem.quantity * stockItem.price, 0);

    const iva = orderTotal * 0.21;

    const shipping_cost = 9.99;

    const total = orderTotal + iva + shipping_cost;

  return (
    <>
      <div className='overflow-hidden bg-[var(--light-grey)]'>
        <NavBar user={auth.user} sectionsBg={{ 'about': '--dark' }} sectionsText={{ 'about': 'white' }} />
        
        <header id="about" className='relative overflow-hidden py-48 text-center'>
          <div className="absolute top-0 bottom-0">
            <video autoPlay={true} muted={true} loop={true}  className="h-screen w-screen object-cover brightness-[0.20]" src='/images/printer1.mp4'></video>
          </div>
          <h1 className='relative z-10 text-white font-bold text-4xl'>Cart</h1>
        </header>

        <main className='my-12 mx-5 md:mx-24 mb-36 relative z-10'>
          <div className='flex flex-col md:flex-col lg:flex-row justify-between gap-6'>
            
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-3 bg-white p-5 rounded-xl shadow-lg'>

{cartItems.map((stockItem) => (
    <div key={stockItem.id}>
        <ProductCard 
            image={stockItem.image} 
            name={stockItem.name} 
            price={stockItem.price} 
            allcolors={colors} 
            color={stockItem.color_name} 
            allmaterials={materials} 
            material={stockItem.material_name} 
            quantity={stockItem.quantity} 
            stockItem={stockItem}
            onUpdateProduct={(updatedData) => handleProductChange(stockItem.id, updatedData)}
        />
    </div>
))}
</div>


            <div className='border border-slate-500 w-full md:w-full lg:w-1/3 p-6 rounded-xl shadow-lg bg-white'>
                <h1 className='text-3xl font-bold mb-4'>Order summary</h1>
                <div className='overflow-x-auto'>
    <table className='w-full rounded p-4 bg-gray-200'>
        <thead>
            <tr>
                <th className='border border-slate-500 p-2 bg-gray-400'>Title</th>
                <th className='border border-slate-500 p-2 bg-gray-400'>Material</th>
                <th className='border border-slate-500 p-2 bg-gray-400'>Color</th>
                <th className='border border-slate-500 p-2 bg-gray-400'>Quantity</th>
                <th className='border border-slate-500 p-2 bg-gray-400'>Price</th>
            </tr>
        </thead>
        <tbody>
            {cartItems.map((stockItem, index) => (
                <tr key={index}>
                    <td className='p-2'>{stockItem.name}</td>
                    <td className='p-2'>{stockItem.material_name}</td>
                    <td className='p-2'>
                        <div className={`w-[30px] h-[30px] rounded-full flex items-center content-center justify-center bg-${stockItem.color_name}-500`}></div>
                    </td>
                    <td className='p-2'>{stockItem.quantity}</td>
                    <td className='p-2'>{(stockItem.quantity * stockItem.price).toFixed(2)}€</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>


                <p className='text-2xl mt-5 flex justify-between'><strong>Subtotal:</strong>{orderTotal.toFixed(2)}€</p>
                <p className='text-2xl mt-5 flex justify-between'><strong>IVA <small>(%21)</small>:</strong> {iva.toFixed(2)}€</p>
                <p className='text-2xl mt-5 flex justify-between'><strong>Shipping:</strong> {shipping_cost}€</p>
                <p className='text-2xl mt-5 flex justify-between text-red-500 font-bold'><strong className='text-black'>Total:</strong> {total.toFixed(2)}€</p>

                <button className="bg-blue-950 font-semibold text-lg text-white py-4 w-full rounded-full mt-4 hover:bg-blue-800 "> <Link href="/payment">Buy now</Link> </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Cart;