import React from 'react'
import Dashboard from '../Dashboard'
import Pagination from "@/Components/Pagination";
import { Link, usePage, useForm } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

export default function ({ users }) {
  const { data, prev_page_url, next_page_url, current_page, last_page } = users;
  const { post: toggleStatus } = useForm();

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

  const onDelete = () => {
    toast.success('User status changed successfully');
  }

  const onError = () => {
    toast.error('Error deleting category');
  }

  return (
    <Dashboard pageName='Users' pageSubtitle='Manage PrintHub users'>
      <div className='flex flex-col min-h-full '>
        <Toaster />
        <Link href={route('admin.user.add')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-end transition hover:bg-[#bbbbbb]">
          <FaPlus />
        </Link>
        <div className='overflow-x-scroll'>
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
                <th className="py-2 px-4 border-b">Status</th>
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
                  )}
                  </td>
                  <td className="py-2 px-4 border-b flex justify-center">{user.avatar ? (
                    <img className="w-[50px] self-center h-[50px] rounded-full border-2 border-slate-200" src={`/storage/avatars/${user.avatar}`} alt="Avatar" />
                  ) : (
                    <div className="w-[50px] h-[50px] bg-blue-500 rounded-full flex items-center content-center justify-center text-white text-2xl font-bold">
                      {user.name[0].toUpperCase() + user.lastname[0].toUpperCase()}
                    </div>
                  )}
                  </td>
                  <td className="py-2 px-4 border-b">{user.created_at}</td>
                  <td className="py-2 px-4 border-b">
                    <div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer" checked={!user.deleted_at} onChange={() => toggleStatus(route("admin.user.toggle", user), {
                          onSuccess: onDelete,
                          onError: onError,
                        }

                        )}></input>
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </td>

                  <td className="py-2 px-4 border-b">
                    <Link
                      href={route('admin.user.edit', user.id)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </Link>
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