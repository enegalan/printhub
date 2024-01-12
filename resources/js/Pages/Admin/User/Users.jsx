import React from 'react'
import Dashboard from '../Dashboard'
import Pagination from "@/Components/Pagination";
import { Link } from '@inertiajs/react';

export default function({users}){
    const { data, prev_page_url, next_page_url, current_page, last_page } = users;
    const priorities = ['admin', 'provider', 'vip', 'guest'];
    const getBackgroundColor = (roles) => {
        const priorityRole = getHighestPriorityRole(roles);
        switch (priorityRole.name) {
            case "admin":
                return "red-500";
            case "guest":
                return "gray-200";
            case "vip":
                return "yellow-400";
            case "provider":
                return "orange-500";
            default:
                return "";
        }
    };
    const getHighestPriorityRole = (roles) => {
        return roles.find(role => priorities.includes(role.name)) || {};
    };
    const handleDelete = (userId) => {
        
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
            <th className="py-2 px-4 border-b">Last name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Birth date</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Avatar</th>
            <th className="py-2 px-4 border-b">Created at</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 text-center divide-x">
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.lastname}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.birthdate}</td>
              <td className="py-2 px-4 border-b">{user.roles.some(role => priorities.includes(role.name)) && (
                            <span className={`bg-${getBackgroundColor(user.roles)} p-2 rounded-lg w-full text-center`}>
                                {getHighestPriorityRole(user.roles).name.charAt(0).toUpperCase() + getHighestPriorityRole(user.roles).name.slice(1)}
                            </span>
                        )}</td>
              <td className="py-2 px-4 border-b flex justify-center">{user.avatar ? (
    <img className="w-[50px] self-center h-[50px] rounded-full border-2 border-slate-200" src={`/storage/avatars/${user.avatar}`} alt="Avatar" />
  ) : (
    <div className="w-[50px] h-[50px] bg-blue-500 rounded-full flex items-center content-center justify-center text-white text-2xl font-bold">
      {user.name[0].toUpperCase() + user.lastname[0].toUpperCase()}
    </div>
  )}</td>
              <td className="py-2 px-4 border-b">{user.created_at}</td>
              
              <td className="py-2 px-4 border-b">
                <Link
                  href={route('admin.user.edit', user.id)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
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