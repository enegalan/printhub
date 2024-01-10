import ProfileLayout from "@/Layouts/ProfileLayout";

export default function ({user}){
    return(
        <ProfileLayout>
            <div className="row-span-4 bg-white rounded-xl p-4">
                {user.name}
            </div>
            <div className="row-span-2 bg-white rounded-xl p-4">
                products
            </div>
            <div className="row-span-2 bg-white rounded-xl p-4">
                Wishlist
            </div>
        </ProfileLayout>
    )
}