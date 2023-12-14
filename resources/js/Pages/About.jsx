import '@/App.css';

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';

import { Faqs } from '@/Components/Faqs';

function About({ auth }) {
  
  return (
    <>
      <div className='overflow-hidden bg-[var(--light-grey)]'>
        <NavBar user={auth.user} sectionsBg={{ 'about': '--dark' }} sectionsText={{ 'about': 'white' }} />
        
        <header id="about" className='relative overflow-hidden bg-[url(/images/impresion1.jpg)] py-48 text-center'>
          <div className="absolute top-0 bottom-0">
            <video autoPlay={true} muted={true} loop={true}  className="h-screen w-screen object-cover brightness-[0.20]" src='/images/printer1.mp4'></video>
          </div>
          <h1 className='relative z-10 text-white font-bold text-4xl'>About us</h1>
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
          {/* How we work */}
          <section className='my-6 flex flex-col gap-3'>
            <h3 className='font-bold text-4xl'>How we work</h3>
            <p className='ml-5 text-gray-700'>
              Experience a seamless journey with PrintHub through two convenient options. 
              Choose to explore our marketplace for curated 3D models or unleash your creativity by uploading a video for AI-driven model extraction. 
              Visualize your creation before purchase, ensuring satisfaction. 
              Upon placing your order, our state-of-the-art printers spring into action. 
              Once your pieces are meticulously crafted, our skilled team conducts a thorough review, guaranteeing quality. 
              Your masterpiece is then swiftly dispatched by our dedicated delivery department, ensuring a seamless and efficient process from creation to your doorstep.
            </p>
          </section>
          {/* Our Team */}
          <section className='my-6'>
            <h3 className='font-bold text-4xl mb-6'>Our Team</h3>
            <div className='flex flex-col md:flex-row justify-center gap-16'>
              <article id="urtzi" className='flex flex-col items-center'>
                <img className="rounded-full mb-3 w-48" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Default-welcomer.png/643px-Default-welcomer.png?20180610185859" alt="worker-image1" />
                <p className='font-bold'>Urtzi Lusarreta</p>
                <span className='text-sm text-gray-800'>Web developer</span>
              </article>
              <article id="iban" className='flex flex-col items-center'>
                <img className="rounded-full mb-3 w-48" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Default-welcomer.png/643px-Default-welcomer.png?20180610185859" alt="worker-image2" />
                <p className='font-bold'>Iban Jara</p>
                <span className='text-sm text-gray-800'>Web developer</span>
              </article>
              <article id="eneko" className='flex flex-col items-center'>
                <img className="rounded-full mb-3 w-48" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Default-welcomer.png/643px-Default-welcomer.png?20180610185859" alt="worker-image3" />
                <p className='font-bold'>Eneko Galan</p>
                <span className='text-sm text-gray-800'>Web developer</span>
              </article>
            </div>
          </section>
           {/* FAQS */}
          <section className='my-6 mt-8'>
            <h3 className='font-bold text-2xl'>FAQS</h3>
            <Faqs/>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Index;