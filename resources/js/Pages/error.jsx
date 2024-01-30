import { Link } from '@inertiajs/react'
import React from 'react'
import '@/../css/backgroundWhite.css';

export default function ({status,message}) {
  //Api de repuesto = https://cataas.com/cat/says/error?type=square&fontSize=80&fontColor=red
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
        <Link href='/' className='text-xl hover:underline mb-5 cursor-pointer '>Go home</Link>
        <p className='mb-2'><strong>{status}</strong> error: {message}</p>
        <img src={`https://http.cat/${status}`} className='rounded-2xl shadow-2xl max-md:px-2 shadow-black/75' alt="Status Code" />
    </div>
  )
}
