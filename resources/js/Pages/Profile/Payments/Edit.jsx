import {  useEffect } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import ProfileLayout from "@/Layouts/ProfileLayout";
import toast from 'react-hot-toast';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SelectOptions from '@/Components/SelectOptions';
import Checkbox from '@/Components/Checkbox';
import { router } from '@inertiajs/react';
import { BackButton } from '@/Components/Buttons';

export default function ({ payment = [], user = [] }) {
    const { data, setData, post, errors } = useForm({
        owner_name: payment.owner_name || "",
        expire_month: payment.expire_date ? payment.expire_date.split('/')[0] : "01",
        expire_year: payment.expire_date ? new Date().getFullYear().toString().slice(0, 2) + payment.expire_date.split('/')[1] : "",
        default: payment.default,
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
        var formData = new FormData();
        formData.append('owner_name', data.owner_name);

        const formattedMonth = data.expire_month.padStart(2, '0');
        const formattedYear = data.expire_year.slice(-2);
        const expireDate = `${formattedMonth}/${formattedYear}`;

        formData.append('expire_date', expireDate);

        const defaultValue = data.default ? 1 : 0;
        formData.append('default', defaultValue);

        try {
            post(route('profile.update.payment', payment.id), formData);
            toast.success('Payment method successfully updated');
            
        } catch (error) {
            toast.error('Cannot save this payment method. Error: ' + error.message);
        }
    };

    useEffect(() => {
        generateMonths();
        generateYears();
    }, [payment]);

    function handleDelete(e) {
        e.preventDefault();
        router.delete('/profile/payment/delete/' + payment.id, { preserveState: true, onSuccess: () => { toast.success('Payment method successfully removed'); }, onError: () => { toast.error('Cannot remove this payment method'); } });
    }

    return (
        <ProfileLayout pageName='Edit Payment Method' pageSubtitle='Manage your cards and accounts' user={user}>
            <BackButton href="profile.payments" />
            
            <h1 className="text-2xl mb-5 text-center">Edit payment method</h1>
            <div className="row-span-4 bg-white rounded-xl p-4 lg:mx-20">
                <form
                    className="px-10 py-5 flex flex-col gap-5"
                    onSubmit={handleSubmit}
                >
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
                        {errors.owner_name && <InputError message={errors.owner_name[0]} className="mt-2" />}
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
                                defaultValue={data.expire_month}
                            />
                            <SelectOptions
                                name="expire_year"
                                options={generateYears()}
                                onChangeOption={(year) => setData('expire_year', year)}
                                className="w-64 h-12"
                                usingObject={false}
                                defaultOption={false}
                                defaultValue={data.expire_year}
                            />
                        </div>
                        {errors && errors.error && <InputError message={errors.error[0]} className="mt-2" />}
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
                        <button type="submit" className="rounded bg-blue-500 text-white px-5 py-2 font-medium">
                            Save
                        </button>
                        <button onClick={handleDelete} className="text-red-700 px-5 py-2 font-medium hover:underline">
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </ProfileLayout>
    );
}