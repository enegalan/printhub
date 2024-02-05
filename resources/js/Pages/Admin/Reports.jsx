import React from 'react'
import Dashboard from './Dashboard'
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
import { useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

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

export default function ({ ordersYear, usersMonth, ordersZone }) {
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December'];
    const daysInMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
    ).getDate();
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    // State para almacenar los datos dinámicos
    const [dynamicData, setDynamicData] = useState({
        orders: [],
        users: [],
        ordersZone: [],
    });

    // Cargar los datos dinámicos al montar el componente
    useEffect(() => {
        setDynamicData({
            orders: Object.values(ordersYear),
            users: Object.values(usersMonth),
            ordersZone: Object.values(ordersZone),
        });
    }, [ordersYear, usersMonth, ordersZone]);

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
        scales: {
            y: {
                suggestedMin: 30,
                suggestedMax: 50,
            }
        }
    };

    const ordersData = {
        labels: months,
        datasets: [
            {
                fill: true,
                label: 'Orders',
                data: dynamicData.orders,
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
                data: dynamicData.users,
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
        labels: dynamicData.ordersZone && dynamicData.ordersZone[0]
        ? dynamicData.ordersZone[0]
        : [],
        datasets: [
            {
                label: "Orders",
                data: dynamicData.ordersZone && dynamicData.ordersZone[1]
                ? dynamicData.ordersZone[1]
                : [],
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
        <Dashboard pageName='Users' pageSubtitle='Manage PrintHub users'>
            <div className='flex flex-col min-h-full overflow-x-scroll'>
                <h3 className="text-2xl font-bold">Reports</h3>
                <div className="flex gap-5 flex-wrap justify-around">
                    <div className="w-[30vw]">
                        <Line options={ordersOptions} data={ordersData} />
                    </div>
                    <div className="w-[30vw]">
                        <Line options={usersOptions} data={usersData} />
                    </div>
                </div>
                <div className='w-[60vh] mt-6 pb-6 m-[auto]'>
                    <Pie options={ordersZoneOptions} data={ordersZoneData} />
                </div>
            </div>
        </Dashboard>
    )
}