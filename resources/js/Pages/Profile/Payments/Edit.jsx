import React from 'react'
import ProfileLayout from "@/Layouts/ProfileLayout";
import Pagination from "@/Components/Pagination";
import { Link } from '@inertiajs/react';
import { FaPlus } from 'react-icons/fa';
import { IoMdArrowRoundBack } from "react-icons/io";
import creditCardType from 'credit-card-type';
import toast, { Toaster } from 'react-hot-toast';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
export default function ({ payment = [], user = [] }) {
    const getCardType = (cardNumber) => {
        const cardTypeInfo = creditCardType(cardNumber);
        if (cardTypeInfo.length > 0) {
            return cardTypeInfo[0].niceType;
        }

        return 'Unknown';
    };

    function submit () {

    }
    return (
        <ProfileLayout pageName='Edit Payment' pageSubtitle='Manage your cards and accounts' user={user}>
            <Link href={route('admin.users')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-start transition hover:bg-[#bbbbbb]">
                <IoMdArrowRoundBack />
            </Link>
            <Toaster />
            <h1 className="text-2xl mb-5 text-center">Edit payment</h1>
            <div className="row-span-4 bg-white rounded-xl p-4 lg:mx-20">
                <form
                    className="px-10 py-5 flex flex-col gap-5"
                    onSubmit={submit}
                    encType="multipart/form-data"
                >
                    <div>
                        <InputLabel forInput="name" value="Name*" className="" />
                        <TextInput
                            id="name"
                            name="name"
                            value={""}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />
                        <InputError message={"errors.name"} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel forInput="lastname" value="Last name*" className="" />
                        <TextInput
                            id="lastname"
                            name="lastname"
                            value={"data.lastname"}
                            className="mt-1 block w-full"
                            autoComplete="lastname"
                            isFocused={true}
                            onChange={(e) => setData("lastname", e.target.value)}
                            required
                        />
                        <InputError message={"errors.lastname"} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel forInput="birthdate" value="Birthdate*" className="" />
                        <TextInput
                            id="birthdate"
                            type="date"
                            name="birthdate"
                            value={"data.birthdate"}
                            className="mt-1 block w-full"
                            autoComplete="birthdate"
                            isFocused={true}
                            onChange={(e) => setData("birthdate", e.target.value)}
                            required
                        />
                        <InputError message={"errors.birthdate"} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel forInput="email" value="E-mail*" className="" />
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            value={"data.email"}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={"errors.email"} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel forInput="password" value="Password" className="" />
                        <TextInput
                            id="password"
                            name="password"
                            type="password"
                            value={"data.password"}
                            className="mt-1 block w-full"
                            autoComplete="password"
                            isFocused={true}
                        />
                        <InputError message={"errors.password"} className="mt-2" />
                    </div>
                    <div>
                        <button className="rounded bg-blue-500 text-white px-5 py-2 font-medium">
                            Submit user
                        </button>
                    </div>
                </form>
            </div>
        </ProfileLayout>
    )
}