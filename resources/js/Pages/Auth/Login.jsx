import { useEffect } from 'react';
import '@/App.css';

import InputError from '@/Components/InputError';
import { Link, useForm } from '@inertiajs/react';

import { GlowSubmitButton } from '@/Components/Buttons';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 via-gray-300 to-gray-50">
            {/*Go back button*/}
            <div className='absolute top-10 left-12'>
                <a className='text-4xl transition text-gray-500 hover:text-black hover:cursor-pointer' onClick={ () => window.history.back()}>
                    <i className='fas fa-arrow-left'></i>
                </a>
            </div>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <form onSubmit={submit}>
                <div className="flex justify-center items-center h-screen">
                    <div className="w-1/2">
                        <div className="flex justify-center items-center">
                            <a href="/">
                                <img src="/logoWhite.svg" className='w-40' alt="" />
                            </a>
                        </div>
                        <div className="mt-8 border bg-[var(--main-blue)] border-gray-500 rounded-xl p-8 shadow-2xl">
                            <h2 className="text-white text-3xl font-bold mb-4">Log In</h2>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={data.username_email}
                                    autoComplete="username_email"
                                    onChange={(e) => setData('email', e.target.value)}
                                    name="email"
                                    className="w-full px-4 py-2 border rounded"
                                    placeholder="Email"
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                    className="w-full px-4 py-2 border rounded"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="checkbox"
                                    name="remember_me"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="mr-2"
                                />
                                <label htmlFor="remember_me" className="text-white">Remember Me!</label>
                            </div>
                            <div className="flex flex-col items-center mb-4 gap-3">
                                <GlowSubmitButton backgroundColor='var(--blue-1)' value='Log in'/>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="transition underline text-sm text-[--light-blue] hover:text-white rounded-md"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>
                            <div className="mb-2">
                                <p className="text-white">Don't have an account? <Link href="/register" className="transition text-[--light-blue] hover:text-white">Register Here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}