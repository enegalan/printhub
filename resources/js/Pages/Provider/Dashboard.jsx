import ProfileLayout from "@/Layouts/ProfileLayout";
import { Link } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

import { FaCartShopping, FaGear, FaHandshake } from "react-icons/fa6";
import { FaBox, FaWallet, FaHome, FaUsers } from "react-icons/fa";

import toast from 'react-hot-toast';

export default function Dashboard({ auth }) {
  return (
    <ProfileLayout pageName="Dashboard" pageSubtitle="Welcome to your profile" user={auth.user}>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="w-full bg-white border border-gray-200 rounded-lg shadow">
          <a href={route('profile.provider.products')}>
            <FaBox className="text-blue-700 text-[200px] mt-3 p-3 mx-auto rounded-t-lg" />
          </a>
          <hr />
          <div class="p-5">
            <a href={route('profile.provider.products')}>
              <h5 class="mb-2 text-2xl font-bold tracking-tight">Products</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Create, edit, or delete your products.</p>

            <Link
              href={route('profile.provider.products')}
              className="items-center justify-center flex px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Go
            </Link>
          </div>
        </div>

        
        <div class="w-full bg-white border border-gray-200 rounded-lg shadow">
          <a href={route('profile.provider.orders')}>
            <FaCartShopping className="text-blue-700 text-[200px] mt-3 mx-auto rounded-t-lg" />
          </a>
          <hr />
          <div class="p-5">
            <a href={route('profile.provider.orders')}>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Orders</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700">Check the orders related to your products.</p>

            <Link
              href={route('profile.provider.orders')}
              className="flex text-center items-center justify-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Go
            </Link>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
