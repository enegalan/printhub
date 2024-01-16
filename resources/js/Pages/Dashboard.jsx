import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth = [], user = [] }) {
    var username;
    if ( user && user.length > 0 ) {
        auth = [];
        username = user.name;
    } else if (auth && auth.length > 0) {
        user = auth.user;
        username = user.name;
    }
    
    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg mt-5'>
                        <h1 className='p-6 text-gray-900'>Hello User {username}</h1>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
