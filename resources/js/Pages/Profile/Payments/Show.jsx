import React from 'react'
import ProfileLayout from "@/Layouts/ProfileLayout";
import Pagination from "@/Components/Pagination";
import { Link } from '@inertiajs/react';
import { FaPlus } from 'react-icons/fa';
import creditCardType from 'credit-card-type';

export default function ({ payments = [], user = [] }) {
    const getCardType = (cardNumber) => {
        const cardTypeInfo = creditCardType(cardNumber);
        if (cardTypeInfo.length > 0) {
            return cardTypeInfo[0].niceType;
        }

        return 'Unknown';
    };

    const sortedPayments = [...payments].sort((a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0));
    return (
        <ProfileLayout pageName='Payment methods' pageSubtitle='Manage your cards and accounts' user={user}>
            <div className='flex flex-col min-h-full'>
                <div className='flex flex-col items-center'>
                    <Link href={route('profile.create.payment')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-end transition hover:bg-[#bbbbbb]">
                        <FaPlus />
                    </Link>
                    <div className='flex flex-col overflow-y-scroll p-6'>
                        {sortedPayments.length > 0 ? (sortedPayments.map(function (payment) {
                            // Determine the card type
                            const cardType = getCardType(payment.number);
                            const last4Digits = payment.number.slice(-4);
                            return (
                                <Link href={route('profile.edit.payment', payment)} className='shadow-lg' key={payment.id}>
                                    <div className="bg-white rounded-lg shadow mt-4 p-6 min-w-[50vh] min-h-[25vh] flex flex-col justify-between">
                                        <div className='flex gap-6 justify-end flex-wrap'>
                                            {payment.default ? (
                                                <div className='rounded-full border flex px-3 py-1 bg-[#f5f5f5] text-sm'>
                                                    Default
                                                </div>
                                            ) : ''
                                            }
                                            <div className='bg-black text-white p-1 rounded-full px-4'>
                                                **** {last4Digits}
                                            </div>
                                        </div>
                                        <div>
                                            <img
                                                src={`/images/cards/${cardType}.png`}
                                                alt={cardType}
                                                className="w-64"
                                            />
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>{payment.expire_date}</span>
                                            <span>{payment.owner_name}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })) : <span>No payment methods found. Set your first payment method clicking on <b>Add button</b> to be prepared for the shopping!'</span>}
                    </div>
                </div>
            </div>
        </ProfileLayout>
    )
}