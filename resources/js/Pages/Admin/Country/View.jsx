import React from 'react'
import Dashboard from '../Dashboard'
import Pagination from "@/Components/Pagination";
import { Link } from "@inertiajs/react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function CountryView({ regions }) {
    const { data, prev_page_url, next_page_url, current_page, last_page } = regions;

    return (
        <Dashboard>
            <Link href={route('admin.countries')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-start transition hover:bg-[#bbbbbb]">
                <IoMdArrowRoundBack />
            </Link>
            <div className='flex flex-col min-h-full '>
                <div className='overflow-x-scroll'>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Name</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {data && data.length > 0 ? (
                                data.map((region) => (
                                    <tr key={region.id} className="hover:bg-gray-50 text-center divide-x">
                                        <td className="py-2 px-4 border-b">{region.id}</td>
                                        <td className="py-2 px-4 border-b">{region.name}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="py-2 px-4 border-b text-center">No results found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='flex self-center flex-1 flex-wrap content-end '>
                    <Pagination
                        prevPageUrl={prev_page_url}
                        nextPageUrl={next_page_url}
                        currentPage={current_page}
                        totalPages={last_page}
                    />
                </div>
            </div>
        </Dashboard>
    );
}