import { Link } from "@inertiajs/react"

export default function ProfileLayout({ children }){
    return(
        <main>
            
            <div className="h-screen flex">
                <nav className="w-52">
                    <ul className="flex flex-col">
                        <li><Link>Dashboard</Link></li>
                        <li><Link>Products</Link></li>
                        <li><Link>Wishlist</Link></li>
                    </ul>
                </nav>
                <div className="flex flex-col flex-1">
                    <div className="mb-4">
                        <h1 className="text-4xl">Profile dashboard</h1>
                        <p className="text-gray-700">Welcom to the profile section</p>
                    </div>
                    <div className="bg-gray-300 rounded-xl px-10 py-10 flex-1 mb-14 flex flex-col">
                        <div className="grid grid-rows-4 grid-flow-col gap-4 flex-1">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            
        </main>
    )
}