import ProfileLayout from "@/Layouts/ProfileLayout";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "@inertiajs/react";
export default function ({user, orders = [], wishlist = []}){
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

    return(
        <ProfileLayout user={user}>
            <div className="flex gap-4 flex-1 items-center justify-start flex-col">
                <div className="flex gap-4 items-center w-full flex-1">
                    <div className="flex flex-col h-full w-96 gap-3 justify-content items-center row-span-2 bg-white rounded-xl p-4">
                        {user.avatar ? (
                            <img className="rounded-full" src={`/storage/avatars/${user.avatar}`} />
                        ) : (
                            <div className="w-28 h-28 bg-blue-500 rounded-full flex items-center content-center justify-center text-white text-xl font-bold">
                                {user.name[0].toUpperCase() + user.lastname[0].toUpperCase()}
                            </div>
                        )}
                        <p>{user.name + ' ' + user.lastname}</p>
                        <p>{user.email}</p>
                        <hr className="w-full border" />
                        <div className="w-full flex flex-col items-center gap-5">
                            <h1 className="font-bold">Membership</h1>
                            <div className="w-full flex flex-col gap-3 items-center">
                            {user.roles.some(role => priorities.includes(role.name)) && (
                                <span className={`bg-${getBackgroundColor(user.roles)} p-2 rounded-lg w-full text-center`}>
                                    {getHighestPriorityRole(user.roles).name.charAt(0).toUpperCase() + getHighestPriorityRole(user.roles).name.slice(1)}
                                </span>
                            )}
                            </div>
                        </div>

                    </div>
                    <div className="flex-1 h-full flex flex-col divide-y col-span-2 bg-white rounded-xl p-4 overflow-y-scroll max-h-[25rem]">
                        <h2 className="text-xl font-bold mb-5">Orders</h2>
                        {orders.length > 0 ? orders.map((order, index) => (
                            <div key={index}>
                                <Link href={"/market/product/"+order.id}>
                                    <div className="flex items-center my-2 justify-between gap-1 w-full cursor-pointer rounded-md hover:bg-[#ededed]" key={order.id}>
                                        <div className="flex gap-28 items-center py-5 px-3">
                                            Order #{order.id}
                                            <span>Status: {order.status}</span>
                                        </div>
                                        <FaAngleRight />
                                    </div>
                                </Link>
                            </div>
                        )) : <span className="pt-5">No orders found. Click <Link className="text-[#1e40af]" href="/market">here</Link> to check out the market.</span>}
                    </div>
                </div>
                <div className="flex-1 w-full row-span-2 bg-white rounded-xl p-4 divide-y">
                    <h2 className="text-xl font-bold mb-5">Wishlist</h2>
                    {wishlist.length > 0 ? wishlist.map((product, index) => (
                        <div key={index}>
                            <Link href={"/market/product/"+product.id}>
                                <div className="flex items-center my-2 justify-between gap-1 w-full cursor-pointer rounded-md hover:bg-[#ededed]" key={product.id}>
                                    <div className="flex gap-28 items-center py-5 px-3">
                                        <div className="flex gap-5 items-center flex-wrap text-center">
                                            <img className="w-[120px] h-[100px]" src="images/imagen1.png" />
                                            {product.name}
                                        </div>
                                        {product.price}€
                                    </div>
                                    <FaAngleRight />
                                </div>
                            </Link>
                        </div>
                    )) : <span className="pt-5">No orders found. Click <Link className="text-[#1e40af]" href="/market">here</Link> to check out the market.</span>}
                </div>
            </div>
        </ProfileLayout>
    )
}