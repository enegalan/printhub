import PayPal from "@/Components/PayPal";
import { Link } from "@inertiajs/react";

export default function CheckOut({ user, price }) {
  return (
    <main className="flex flex-col md:flex-row h-screen divide-x-2 divide-neutral-300 bg-[url(/images/dark-blue-blur-background-vector.webp)] bg-cover bg-no-repeat" >
      <div className="text-white flex-1 flex items-center justify-center w-full xl:px-32">
        <div className="p-10 flex flex-col gap-4 w-full justify-between h-full">
          <div>
            <Link
              href="/"
              className="text-4xl font-bold justify-start flex gap-8 items-center md:flex md:items-center"
            >
              <img src="/logoBlue.svg" alt="Logo" />
              PrintHub
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl underline">User data</h1>
            <div className="p-2 flex gap-2 bg-white/10 rounded-lg">
              <h1 className="font-bold">Name: </h1>
              <h1>{user.name}</h1>
            </div>
            <div className="p-2 flex gap-2 bg-white/10 rounded-lg">
              <h1 className="font-bold">Lastname: </h1>
              <h1>{user.lastname}</h1>
            </div>
            <div className="p-2 flex gap-2 bg-white/10 rounded-lg">
              <h1 className="font-bold">Email account: </h1>
              <h1>{user.email}</h1>
            </div>
          </div>
          <PayPal buttonColor="white" total={9.99} />
          {/* <button className="bg-blue-500 text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-600 transition-colors ease-in-out duration-300">Pay now</button> */}
        </div>
      </div>
      <div className="bg-white text-black p-10 md:w-1/3">
        <div className="flex items-center justify-between pb-4">
          <img
            src="/images/Vip.png"
            className="bg-white rounded w-16 h-16 border"
            alt=""
          />
          <p>Vip account upgrade for one user</p>
          <h1>{price}</h1>
        </div>
        <hr />
        <div className="pt-4 flex justify-between text-2xl">
          <h1>Total</h1>
          <h1 className="text-red-500 font-bold">${price}</h1>
        </div>
      </div>
    </main>
  );
}
