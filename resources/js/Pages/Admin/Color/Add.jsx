import React, { useEffect, useState } from "react";
import Dashboard from '../Dashboard'
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/inertia-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "@inertiajs/react";
import toast, { Toaster } from 'react-hot-toast';

export default function Add() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        hex: '',
        factor: 1.00,
    });

    const onAdd = () => {
        toast.success('Color created successfully');
    }

    const onError = (e) => {
        toast.error('Error creating color');
    }

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("name", data.hex);
        try {
            post(route("admin.store.color", formData));
            onAdd();
        } catch (e) {
            onError(e);
           
        }
    };

    return (
        <Dashboard pageName='Colors' pageSubtitle="Manage product's colors">
            <Link href={route('admin.colors')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-start transition hover:bg-[#bbbbbb]">
                <IoMdArrowRoundBack />
            </Link>
            <Toaster />
            <h1 className="text-2xl mb-5 text-center">Create color</h1>
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

                        <InputLabel forInput="hex" value="Hex*" className="text-gray-900" />
                        <TextInput
                            id="hex"
                            name="hex"
                            type="color"
                            value={data.hex}
                            className="mt-1 block w-full"
                            autoComplete="hex"
                            isFocused={true}
                            onChange={(e) => setData("hex", e.target.value)}
                            required
                        />
                        <InputError message={errors.hex} className="mt-2" />

                        <InputLabel forInput="factor" value="Factor*" className="text-gray-900" />
                        <TextInput
                            id="factor"
                            name="factor"
                            type="number"
                            min="1"
                            step="0.01"
                            value={data.factor}
                            className="mt-1 block w-full"
                            autoComplete="factor"
                            isFocused={true}
                            onChange={(e) => setData("factor", e.target.value)}
                            required
                        />
                        <InputError message={errors.factor} className="mt-2" />
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