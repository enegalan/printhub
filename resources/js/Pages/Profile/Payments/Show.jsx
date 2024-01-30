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
    return (
        <ProfileLayout pageName='Payments' pageSubtitle='Manage your cards and accounts' user={user}>
            <div className='flex flex-col min-h-full'>
                <div className='flex flex-col items-center'>
                    <Link href={route('provider.add')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-end transition hover:bg-[#bbbbbb]">
                        <FaPlus />
                    </Link>
                    <div className='flex flex-col overflow-y-scroll p-6'>
                        {payments.map(function (payment) {
                            console.log(payment);

                            // Determine the card type
                            const cardType = getCardType(payment.number);
                            console.log(cardType);

                            const last4Digits = payment.number.slice(-4);

                            return (
                                <Link href={route('profile.edit.payment', payment)} className='shadow-lg'>
                                    <div key={payment.id} className="bg-white rounded-lg shadow mt-4 p-6 min-w-[50vh] min-h-[25vh] flex flex-col justify-between">
                                        <div className='flex gap-6 justify-end'>
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
                                        <img
                                            src={`/images/cards/${cardType}.png`}
                                            alt={cardType}
                                            className="w-64"
                                        />
                                        <div className='flex justify-end'>
                                            {payment.owner_name}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ProfileLayout>
    )
}