import React from 'react'
import Dashboard from '../Dashboard'
import Pagination from "@/Components/Pagination";
import { Link } from '@inertiajs/react';

export default function({colors}){
    const { data, prev_page_url, next_page_url, current_page, last_page } = colors;
    const handleDelete = (productId) => {
        
        //console.log(`Eliminar región con ID: ${regionId}`);
      };
    return(
        <Dashboard>
            <div className='flex flex-col min-h-full '>
            <div className=''>
            <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Color</th>
            <th className="py-2 px-4 border-b">Created at</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {data.map((color) => (
            <tr key={color.id} className="hover:bg-gray-50 text-center divide-x">
              <td className="py-2 px-4 border-b">{color.id}</td>
              <td className="py-2 px-4 border-b">{color.name}</td>
              <td className="py-2 px-4 border-b flex items-center content-center justify-center">
            
                <div className={`w-[50px] h-[50px] rounded-full flex items-center content-center justify-center bg-${color.name}-500`}></div>
                
                
                </td>
              <td className="py-2 px-4 border-b">{color.created_at}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  href={route('admin.color.edit', color.id)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(color.id)}
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