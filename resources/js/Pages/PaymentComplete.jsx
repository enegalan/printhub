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
            <h3 className='font-bold text-4xl'>What is PrintHub</h3>
            <p className='ml-5 text-gray-700'>
              PrintHub, a cutting-edge 3D printing company, revolutionizes the industry by seamlessly integrating AI technology. 
              Specializing in transforming videos into intricate 3D models, PrintHub empowers users to effortlessly bring their ideas to life. 
              With an intuitive interface, this innovative platform caters to both beginners and experts, making 3D printing accessible to all. 
              Elevate your creativity with PrintHub's dynamic fusion of 3D printing and artificial intelligence.
            </p>
          </section>
           
        </main>

        <Footer />
      </div>
    </>
  )
}

export default PaymentComplete;