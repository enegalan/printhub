import React from 'react'
import Dashboard from '../Dashboard'
import Pagination from "@/Components/Pagination";
import { Link, useForm } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
export default function ({ products }) {
  const { data, prev_page_url, next_page_url, current_page, last_page } = products;
  const { delete: handleDelete, data: formData } = useForm();

  const onDelete = () => {
    toast.success('Category deleted successfully');
  }

  const onError = () => {
    toast.error('Error deleting category');
  }
  return (
    <Dashboard>
      <div className='flex flex-col min-h-full '>
        <Toaster />
        <Link href={route('provider.add')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-end transition hover:bg-[#bbbbbb]">
          <FaPlus />
        </Link>
        <div className='overflow-x-scroll'>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className=''>
              {data.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 text-center divide-x">
                  <td className="py-2 px-4 border-b">{product.id}</td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">{product.categories.map((category) => (category.name) + ',')}</td>
                  <td className="py-2 px-4 border-b"><img src={`/storage/products/${product.image}`}></img></td>
                  <td className="py-2 px-4 border-b">{product.price}$</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      href={route('admin.product.edit', product.id)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(route("admin.product.delete", product), {
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