import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';
import PricingCard from '@/Components/PricingCard';
import toast, { Toaster } from 'react-hot-toast';
import error from '../error';

function Dashboard ({user,errors}) {
    const VIP_PRICE = 9.99
    if (errors[0]) {
        toast.error(errors[0].toString())
    }
    return (
        <>
            <NavBar user={user} className="lg:backdrop-blur-md border-b max-lg:bg-blue-900/50 border-blue-950/50" defaultBackgroundColor="transparent" defaultTextColor="var(--white)" dynamicBackground={false} />
            <Toaster/>
                <main className='py-44 px-10 bg-[url(/images/dark-blue-blur-background-vector.webp)] bg-cover bg-no-repeat space-y-10 gap-10 -mb-16'>
                    
                    <header className='text-white text-center'>
                        <h1 className='text-6xl font-bold'>Pricing</h1>
                        <p className='md:w-[32rem] pt-5 w-auto md:m-auto text-2xl text-gray-400'>Get started for free with everything you need to launch your project in just a few clicks</p>
                    </header>
                    <section className='flex xl:flex-row gap-4 flex-col items-center justify-center'>
                        <PricingCard 
                        plan="Free" 
                        price={0}
                        description="Deno Deploy is a distributed system that runs JavaScript, "
                        advantagesArray={["No pice limit","asda","asdasd"]}
                        />
                        <PricingCard 
                        plan="Vip" 
                        price={VIP_PRICE}
                        description="Deno Deploy is a distributed system that runs JavaScript, TypeScript, and WebAssembly at the edge, worldwide."
                        advantagesArray={["Higer priority orders","Order discounts","No shiping cost"]}
                        popular={true}
                        href={route('pricing.payment')}
                        />
                        <PricingCard 
                        plan="Enterprice" 
                        description="Deno Deploy is a distributed system that runs JavaScri"
                        advantagesArray={["asdas","asda","asdasd"]}
                        />
                    </section>
                </main>
            <Footer />
        </>
    );
}

export default Dashboard;