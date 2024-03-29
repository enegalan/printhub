import React from "react";
import Dashboard from '../Dashboard'
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/inertia-react";
import toast from 'react-hot-toast';
import { BackButton } from "@/Components/Buttons";

export default function Add() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const onAdd = () => {
        const successMessage = 'Material created successfully';
        localStorage.setItem('successMessageMaterial', successMessage);
    }

    const onError = (e) => {
        toast.error('Error creating material');
    }

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        try {
            post(route("admin.store.material", formData));
            onAdd();
        } catch (e) {
            onError(e);
        }
    };

    return (
        <Dashboard pageName='Materials' pageSubtitle="Manage product's materials">
            <BackButton href="admin.materials" />
            <h1 className="text-2xl mb-5 text-center">Create material</h1>
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