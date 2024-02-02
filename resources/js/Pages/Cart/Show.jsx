import '@/App.css';

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';

import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import ProductCard from './ProductCard';
import { useState, useEffect } from "react";


import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import toast, { Toaster } from 'react-hot-toast';

function Cart({ auth, cart, materials, colors, isVip }) {


    const [cartItems, setCartItems] = useState(cart.stock_carts);

    

    const handleProductChange = (productId, updatedData) => {
      
        const updatedCartItems = cartItems.map((item) =>
          item.stock_cart_id === productId ? { ...item, ...updatedData } : item
        );
        setCartItems(updatedCartItems);
      };

    const orderTotal = cartItems.reduce((total, stockItem) => total + stockItem.quantity * stockItem.price, 0);

    const iva = orderTotal * 0.21;

    const shipping_cost = 9.99;

    const total = orderTotal + iva + (isVip ? 0 : shipping_cost);

    const [selectedProductId, setSelectedProductId] = useState(null);
    

    useEffect(() => {
      const successMessage = localStorage.getItem('successMessage');
      const errorMessage = localStorage.getItem('errorMessage');
  
      if (successMessage) {
        toast.success(successMessage);
        localStorage.removeItem('successMessage');
      } else if (errorMessage) {
        toast.error(errorMessage);
        localStorage.removeItem('errorMessage');
      }
    }, []);


    const handleDelete = (productId) => {
      setSelectedProductId(productId);
      openModal();
    };

    const confirmModal = () => {
      closeModal();
      onDeleteProduct(selectedProductId);
    };

    const openModal = () => {
      document.getElementById('confirmModal').classList.remove('hidden');
    };
  
    const closeModal = () => {
      document.getElementById('confirmModal').classList.add('hidden');
    };

    const onDeleteProduct = async (productId) => {
      try {
        const response = await fetch(`/api/delete-cart-product/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          if (data.redirect) {
            localStorage.setItem('successMessage', 'Product deleted from cart successfully!');
            window.location.href = data.redirect;
          } else {
            console.log("Formularios enviados exitosamente:", data);
          }
        } else {
          localStorage.setItem('errorMessage', 'Something went wrong. Please try again.');
        }
      } catch (error) {
        localStorage.setItem('errorMessage', 'Something went wrong. Please try again.');
        console.error("Error al enviar formularios:", error);
      }
    };

  return (
    <>
      <div className='overflow-hidden bg-[var(--light-grey)]'>
        <NavBar user={auth.user} sectionsBg={{ 'about': '--dark' }} sectionsText={{ 'about': 'white' }} />
        <Toaster />
        <header id="about" className='relative overflow-hidden py-48 text-center'>
          <div className="absolute top-0 bottom-0">
            <video autoPlay={true} muted={true} loop={true}  className="h-screen w-screen object-cover brightness-[0.20]" src='/images/printer1.mp4'></video>
          </div>
          <h1 className='relative z-10 text-white font-bold text-4xl'>Cart</h1>
        </header>

        <main className='my-12 mx-5 md:mx-24 mb-36 relative z-10'>
          <div className='flex flex-col md:flex-col lg:flex-row justify-between gap-6'>
            
          <div className='grid grid-cols-1 overflow-y-auto max-h-[800px] w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 bg-white p-5 rounded-xl shadow-lg'>
            {cartItems.length === 0 ? (
              <p className="font-bold text-2xl">The cart is empty.</p>
            ) : (
              cartItems.map((stockItem) => (
                <div className="flex justify-center" key={stockItem.stock_cart_id}>
                  <ProductCard 
                    image={stockItem.image} 
                    name={stockItem.name} 
                    price={stockItem.price} 
                    allcolors={colors} 
                    color_name={stockItem.color_name}
                    color_id={stockItem.color_id} 
                    allmaterials={materials} 
                    material_name={stockItem.material_name} 
                    material_id={stockItem.material_id} 
                    quantity={stockItem.quantity} 
                    stockItem={stockItem}
                    handleDelete={handleDelete} 
                    onUpdateProduct={(updatedData) => handleProductChange(stockItem.stock_cart_id, updatedData)}
                  />
                </div>
              ))
            )}
          </div>

          <div id="confirmModal" className="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 flex items-center justify-center hidden">
            <div className="bg-white p-8 rounded shadow-md">
              <p className="text-lg font-semibold mb-4">Are you sure you want delete this from your cart?</p>
              <div className="flex justify-center">
                <PrimaryButton className="mr-2 bg-red-500" onClick={confirmModal}>Yes</PrimaryButton>
                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
              </div>
            </div>
          </div>
      
          {cartItems.length > 0 && (
            <div className='border border-slate-500 w-full md:w-full lg:w-1/3 p-6 rounded-xl shadow-lg bg-white'>
            <h1 className='text-3xl font-bold mb-4'>Order summary</h1>
              <div className='flex flex-col content-between'>
                <div className='overflow-x-auto max-h-[310px] overflow-y-auto'>
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
                        <tr key={index} className='border-b-2 border-gray-300'>
                          <td className='p-2'>{stockItem.name}</td>
                          <td className='p-2'>{stockItem.material_name}</td>
                          <td className='p-2'>
                            <div className={`w-[30px] h-[30px] rounded-full flex items-center content-center justify-center bg-${stockItem.color_name}-500`}></div>
                          </td>
                          <td className='p-2'>{stockItem.quantity}</td>
                          <td className='p-2'>{(stockItem.quantity * stockItem.price).toFixed(2)}$</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className='mt-[100px]'>
                  <p className='text-2xl mt-5 flex justify-between'><strong>Subtotal:</strong>{orderTotal.toFixed(2)}$</p>
                  <p className='text-2xl mt-5 flex justify-between'><strong>IVA <small>(%21)</small>:</strong> {iva.toFixed(2)}$</p>
                  <p className='text-2xl mt-5 flex justify-between'><strong>Shipping:</strong>{isVip ? (
                  <span>0$ <del className='text-lg'>{shipping_cost}$</del></span>
                ) : (
                  <span>
                    {shipping_cost}$
                  </span>
                )}</p>
                <p className='text-2xl mt-5 flex justify-between text-red-500 font-bold'><strong className='text-black'>Total:</strong> {total.toFixed(2)}$</p>
                <Link href="/payment" as="button" className="bg-blue-950 font-semibold text-lg text-white py-4 w-full rounded-full mt-4 hover:bg-blue-800" type="button">Buy Now</Link>
                </div>
                </div>
            </div>
            )}
          
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Cart;