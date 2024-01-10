import '@/App.css';

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';

import { Faqs } from '@/Components/Faqs';

function PaymentComplete({ auth }) {
  
  return (
    <>
      <div className='overflow-hidden bg-[var(--light-grey)]'>
        <NavBar user={auth.user} sectionsBg={{ 'about': '--dark' }} sectionsText={{ 'about': 'white' }} />
        
        <header id="about" className='relative overflow-hidden py-48 text-center bg-green-200'>
         
          <h1 className='relative z-10 text-green-400 font-bold text-4xl'>Payment Successful!</h1>
        </header>

        <main className='my-12 mx-5 md:mx-24 mb-36 relative z-10'>
          {/* What is PrintHub */}
          <section className='my-6 flex flex-col gap-3'>
            
            <p className='ml-5 text-gray-700'>
              Thank you for your purchase.
            </p>
          </section>
           
        </main>

        <Footer />
      </div>
    </>
  )
}

export default PaymentComplete;