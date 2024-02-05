import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import ProfileLayout from "@/Layouts/ProfileLayout";
import { Link, useForm } from "@inertiajs/react";
import { FaPlus } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function ProviderShow({ user, products }) {
  const { data, prev_page_url, next_page_url, current_page, last_page } = products;
  const { delete: handleDelete } = useForm();
  return (
    <ProfileLayout user={user} pageName="Provider" pageSubtitle="Provider dashboard - Products list">
      <Link
        href={route("profile.provider")}
        className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-start transition hover:bg-[#bbbbbb]"
      >
        <IoMdArrowRoundBack />
      </Link>
      <Link href={route('provider.add')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-end transition hover:bg-[#bbbbbb]">
          <FaPlus />
      </Link>
      <div className="flex flex-col min-h-full">
        <div className="">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Categories</th>
                <th className="py-2 px-4 border-b">Image URL</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 text-center divide-x"
                >
                  <td className="py-2 px-4 border-b">{product.id}</td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">
                    {product.categories.map((category, index) => (
                      <span key={index}>
                        {category.name}
                        {index !== product.categories.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img
                      width={100}
                      height={100}
                      src={`/storage/products/${product.image}`}
                      alt={"default"}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{product.price}$</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      href={route('provider.edit', product)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(route("product.destroy", product))}
                      className="text-red-500 cursor-pointer hover:underline mr-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex self-center flex-1 flex-wrap content-end ">
          <Pagination
            prevPageUrl={prev_page_url}
            nextPageUrl={next_page_url}
            currentPage={current_page}
            totalPages={last_page}
          />
        </div>
      </div>
    </ProfileLayout>
  );
}