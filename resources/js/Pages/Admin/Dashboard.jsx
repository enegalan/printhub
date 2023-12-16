import '@/App.css';

import NavBar from '@/Components/NavBar';
import { Footer } from '@/Components/Footer';

function Dashboard({ auth }) {

    return (
        <>
            <div className='overflow-hidden bg-[var(--light-grey)]'>
                <NavBar user={auth.user} dynamicBackground={false} defaultBackgroundColor='var(--main-blue)' defaultTextColor='white' />
                <section className='my-48'>
                    <h1 className='font-bold text-3xl'>Admin Dashboard</h1>
                </section>
                <Footer />
            </div>
        </>
    )
}

export default Dashboard;