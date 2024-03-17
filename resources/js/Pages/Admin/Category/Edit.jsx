import React from "react";
import Dashboard from '../Dashboard'
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/inertia-react";
import toast, { Toaster } from 'react-hot-toast';
import { BackButton } from "@/Components/Buttons";

export default function Edit({ category }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: category.name,
    });

    const onAdd = () => {
        const successMessage = 'Category update successfully';
        localStorage.setItem('successMessageCategory', successMessage);
    }

    const onError = (e) => {
        toast.error('Error updating category');
    }

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        try {
            post(route("admin.update.category", category, formData));
            onAdd();
        } catch (e) {
            onError(e);
        }
    };

    return (
        <Dashboard pageName='Categories' pageSubtitle="Manage product's categories">
            <BackButton href="admin.categories" />
            <Toaster />
            <h1 className="text-2xl mb-5 text-center">Edit categories</h1>
            <div className="row-span-4 bg-white rounded-xl p-4 lg:mx-20">
                <form
                    className="px-10 py-5 flex flex-col gap-5"
                    onSubmit={submit}
                >
                    <div>
                        <InputLabel forInput="name" value="Name*" className="text-gray-900" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <button className="rounded bg-blue-500 text-white px-5 py-2 font-medium">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
}