import React from 'react'
import Dashboard from '../Dashboard'
import Pagination from "@/Components/Pagination";
import { Link } from '@inertiajs/react';
import ProfileLayout from "@/Layouts/ProfileLayout";
import { FaPlus } from 'react-icons/fa';
import { IoMdArrowRoundBack } from "react-icons/io";
export default function ({ auth, orders }) {
  const { data, prev_page_url, next_page_url, current_page, last_page } = orders;

  return (
    <ProfileLayout pageName='Orders' user={auth.user} pageSubtitle='Checkout the orders'>
        <Link
        href={route("profile.provider.dashboard")}
        className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-start transition hover:bg-[#bbbbbb]"
      >
        <IoMdArrowRoundBack />
      </Link>
      <div className='flex flex-col min-h-full '>
        <div className='overflow-x-scroll'>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Last name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Products</th>
                <th className="py-2 px-4 border-b">Created at</th>
              </tr>
            </thead>
            <tbody className=''>
              {data.map((order) => {
                if (!order.invoice) return false;
                return (
                  <tr key={order.id} className="hover:bg-gray-50 text-center divide-x">
                    <td className="py-2 px-4 border-b">{order.id}</td>
                    <td className="py-2 px-4 border-b">{order.invoice.name}</td>
                    <td className="py-2 px-4 border-b">{order.invoice.lastname}</td>
                    <td className="py-2 px-4 border-b">{order.invoice.email}</td>
                    <td className={`py-2 px-4 border-b ${order.status === 'Paid' ? 'bg-green-100' : order.status === 'Not paid' ? 'bg-red-100' : order.status === 'Shipping' ? 'bg-orange-100' : order.status === 'Delivered' ? 'bg-blue-100' : ''}`}>{order.status}</td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        href={route('profile.orders.view', order.id)}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        View
                      </Link></td>
                    <td className="py-2 px-4 border-b">{order.created_at}</td>
                  </tr>
                )
              })}
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
    </ProfileLayout>
  )
}