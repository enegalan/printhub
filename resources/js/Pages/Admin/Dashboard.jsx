import { Link } from "@inertiajs/react";
import logoBlue from "../../../../public/logoWhite.svg";
import gbBlue from "../../../../public/images/Blue-dotted-Background-images.jpg"
import { FaUser, FaHeart, FaWallet, FaAddressCard, FaHome } from "react-icons/fa";
import { FaCartShopping, FaGear } from "react-icons/fa6";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';


import React, { useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
);

export default function ProfileLayout({ children, pageName = 'Admin Dashboard', pageSubtitle = 'Welcome to admin section' }) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December'];
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  
  // Orders this year
  const ordersOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Orders this year',
      },
    },
  };
  const ordersData = {
    labels: months,
    datasets: [
      {
        fill: true,
        label: 'Orders',
        data: [100, 200, 500, 1000, 600, 700, 456, 1020, 2000, 1230,],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  // Registered users this month
  const usersOptions = {
    responsive: true,
    redraw: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Authenticated users this month',
      },
    },
  };
  const usersData = {
    labels: days,
    datasets: [
      {
        fill: true,
        label: 'Users',
        data: [100, 200, 500, 1000, 600, 700, 456, 1020, 2000, 1230, 2000, 2123, 1232 , 1251, 1234, 555, 23, 155, 200, 300, 500, 250, 700, 200, 300, 500, 670, 300, 200, 150, 200],
        borderColor: '#8ad58a',
        backgroundColor: '#8ad58a69',
      },
    ],
  };

  // Orders by zone this year
  const ordersZoneOptions = {
    responsive: true,
    redraw: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Orders by zone this year',
      },
    },
  };
  const ordersZoneData = {
    labels: ['Spain', 'UK', 'Russia', 'Germany', 'Poland', 'Indonesia'],
    datasets: [
      {
        label: 'Zone',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <main className={`bg-[url('${gbBlue}')] bg-cover`}>
      <div className="h-screen flex bg-white/30">
        <nav className="w-52 flex flex-col">
          <div className="p-2 flex justify-center">
            <Link href={route("index")}>
              <img src={logoBlue} alt="Logo" />
            </Link>
          </div>
          <ul className="flex flex-col gap-2 mt-10 text-xl flex-1">
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("index")}
                className="flex gap-2 items-center px-5"
              >
                <FaHome className="text-blue-700" />
                <p className="">Home</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.dashboard")}
                className="flex gap-2 items-center pl-5"
              >
                <FaUser className="text-blue-700" />
                <p className="">Dashboard</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.products")}
                className="flex gap-2 items-center pl-5"
              >
                <FaCartShopping className="text-blue-700" />
                <p>Products</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.users")}
                className="flex gap-2 items-center pl-5"
              >
                <FaHeart className="text-blue-700" />
                <p>Users</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.orders")}
                className="flex gap-2 items-center pl-5"
              >
                <FaAddressCard className="text-blue-700" />
                <p>Orders</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.materials")}
                className="flex gap-2 items-center pl-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Materials</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.colors")}
                className="flex gap-2 items-center pl-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Colors</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.countries")}
                className="flex gap-2 items-center pl-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Countries</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.regions")}
                className="flex gap-2 items-center pl-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Regions</p>
              </Link>
            </li>
            <li className="hover:bg-blue-100 py-2">
              <Link
                href={route("admin.categories")}
                className="flex gap-2 items-center pl-5"
              >
                <FaWallet className="text-blue-700" />
                <p>Categories</p>
              </Link>
            </li>
          </ul>
          <div className="self-center mb-5">
            <Link
              href={route("logout")}
              method="post"
              as="button"
              className="text-white hover:underline text-lg bg-blue-700 py-1 px-4 rounded font-bold"
            >
              Log out
            </Link>
          </div>
        </nav>
        <div className="flex flex-col flex-1">
          <div className="my-4">
            <h1 className="text-4xl">{pageName}</h1>
            <p className="text-gray-700">{pageSubtitle}</p>
          </div>
          <div className="bg-gray-200/60 overflow-auto rounded-xl px-10 py-10 flex-1 mb-14 flex flex-col mr-5">  
            <h3 className="text-2xl font-bold">Reports</h3>
            <Line options={ordersOptions} data={ordersData} />
            <Line options={usersOptions} data={usersData} />
            <Pie options={ordersZoneOptions} data={ordersZoneData} />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}