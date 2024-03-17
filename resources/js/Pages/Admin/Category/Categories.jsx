import React from 'react'
import { useEffect, useRef } from 'react';
import Dashboard from '../Dashboard'
import Pagination from "@/Components/Pagination";
import { Link, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

export default function ({ categories }) {
  const { data, prev_page_url, next_page_url, current_page, last_page } = categories;

  const { delete: handleDelete, data: formData } = useForm();

  const onDelete = () => {
    toast.success('Category deleted successfully');
  }

  const onError = () => {
    toast.error('Error deleting category');
  }

  useEffect(() => {
    const successMessage = localStorage.getItem('successMessageCategory');
    if (successMessage) {
        toast.success(successMessage);
        localStorage.removeItem('successMessageCategory');
    }
}, []);

  return (
    <Dashboard>
      <div className='flex flex-col min-h-full '>
        <Link href={route('admin.category.add')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-end transition hover:bg-[#bbbbbb]">
          <FaPlus />
        </Link>
        <div className='overflow-x-scroll'>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Created at</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className=''>
              {data.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 text-center divide-x">
                  <td className="py-2 px-4 border-b">{category.id}</td>
                  <td className="py-2 px-4 border-b">{category.name}</td>
                  <td className="py-2 px-4 border-b">{category.created_at}</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      href={route('admin.category.edit', category.id)}


                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(route("admin.category.delete", category), {
                        onSuccess: onDelete,
                        onError: onError,
                      }

                      )}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
  )
}