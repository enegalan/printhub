import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import ProfileLayout from "@/Layouts/ProfileLayout";
import { Link } from '@inertiajs/react';
import { IoMdArrowRoundBack } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SelectOptions from '@/Components/SelectOptions';
import Checkbox from '@/Components/Checkbox';
import { router } from '@inertiajs/react';

export default function ({ user = [], errors }) {
    const defaultExpireMonth = '01';
    const defaultExpireYear = (new Date().getFullYear() + 1).toString().slice(2);

    const { data, setData, post, processing } = useForm({
        preserveState: true,
        onSuccess: () => { toast.success('Payment method successfully added'); },
        onError: () => { toast.error('Cannot save this payment method'); }
    });

    const generateMonths = () => {
        const months = [];
        for (let i = 1; i <= 12; i++) {
            const monthValue = i < 10 ? `0${i}` : `${i}`;
            months.push(monthValue);
        }
        return months;
    };

    const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear; i <= currentYear + 20; i++) {
            years.push(i);
        }
        return years;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data.owner_name);
        console.log(data.number);
        console.log(data.expire_month);
        console.log(data.expire_year);
        console.log(data.cvv);
        console.log(data.default);

        var formData = new FormData();
        formData.append('owner_name', data.owner_name);
        formData.append('number', data.number);
        formData.append('expire_month', data.expire_month);
        formData.append('expire_year', data.expire_year);
        formData.append('cvv', data.cvv);
        formData.append('default', data.default);
        

        post('/profile/payment/store/', formData, {
            preserveState: true,
            onSuccess: (response) => {
                toast.success(response.success); // or any other success message
            },
            onError: (error) => {
                toast.error(error.error); // or any other error message
            },
        });
    };

    const formatCardNumber = (value) => {
        if (value) {
            const numericValue = value.replace(/\D/g, '');
            let formattedValue = numericValue.replace(/(\d{4})/g, '$1 ');

            // If the last character is a space, remove it to prevent clearing the input
            if (formattedValue.endsWith(' ')) {
                formattedValue = formattedValue.slice(0, -1);
            }

            return formattedValue.trim();
        }
        return '';
    };

    useEffect(() => {
        generateMonths();
        generateYears();
        setData(prevData => ({
            ...prevData,
            expire_month: prevData.expire_month || defaultExpireMonth,
            expire_year: prevData.expire_year || defaultExpireYear,
        }));
    }, []);

    return (
        <ProfileLayout pageName='Add Payment Method' pageSubtitle='Manage your cards and accounts' user={user}>
            <Link href={route('profile.payments')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-start transition hover:bg-[#bbbbbb]">
                <IoMdArrowRoundBack />
            </Link>
            <Toaster />
            <h1 className="text-2xl mb-5 text-center">Add payment method</h1>
            <div className="row-span-4 bg-white rounded-xl p-4 lg:mx-20">
                <form
                    className="px-10 py-5 flex flex-col gap-5"
                    onSubmit={handleSubmit}
                >
                    {errors && errors.error && <InputError message={errors.error[0]} className="mt-2" />}

                    <div>
                        <InputLabel value="Owner name*" className="text-black" />
                        <TextInput
                            id="owner_name"
                            name="owner_name"
                            value={data.owner_name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('owner_name', e.target.value)}
                        />
                        {errors.owner_name && <InputError message={errors.owner_name} className="mt-2" />}
                    </div>

                    <div>
                        <InputLabel value="Card number*" className="text-black" />
                        <TextInput
                            id="number"
                            name="number"
                            type="text"
                            value={formatCardNumber(data.number)}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('number', e.target.value.replace(/\s/g, ''))}
                        />
                        {errors.number && <InputError message={errors.number} className="mt-2" />}
                    </div>

                    <div>
                        <InputLabel value="Expire date" className='text-black' />
                        <div className='flex gap-5 items-center mt-2'>
                            <SelectOptions
                                name="expire_month"
                                options={generateMonths()}
                                onChangeOption={(month) => setData('expire_month', month)}
                                className="w-64 h-12"
                                usingObject={false}
                                defaultOption={false}
                                defaultValue={data.expire_month || defaultExpireMonth}
                            />
                            <SelectOptions
                                name="expire_year"
                                options={generateYears()}
                                onChangeOption={(year) => setData('expire_year', year)}
                                className="w-64 h-12"
                                usingObject={false}
                                defaultOption={false}
                                defaultValue={data.expire_year || defaultExpireYear}
                            />
                        </div>
                        {errors.expire_date && <InputError message={errors.expire_date} className="mt-2" />}
                    </div>

                    <div>
                        <InputLabel value="CVV*" className="text-black" />
                        <TextInput
                            id="cvv"
                            name="cvv"
                            type="password"
                            value={data.cvv}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                            pattern="\d*"
                            inputMode="numeric"
                        />
                        {errors.cvv && <InputError message={errors.cvv} className="mt-2" />}
                    </div>
                    <div>
                        <Checkbox
                            name="default"
                            checked={data.default}
                            onChange={(e) => setData('default', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Set default payment method</span>
                    </div>
                    <div>
                        <button type="submit" className="rounded bg-blue-500 text-white px-5 py-2 font-medium" disabled={processing}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </ProfileLayout>
    );
}
