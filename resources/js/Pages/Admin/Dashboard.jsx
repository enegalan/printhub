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
                    <div>
                        <iframe title="PrintHub" width="1140" height="541.25"
                        src="https://app.powerbi.com/reportEmbed?reportId=9e0afcf1-ec2b-4b1f-8642-14cd8d0147da&autoAuth=true&ctid=d588ea47-59c1-4a51-b7c3-06ed08676111"
                        frameborder="0" allowFullScreen="true"></iframe>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}

export default Dashboard;