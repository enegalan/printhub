import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import ProfileLayout from "@/Layouts/ProfileLayout";
import { Link, useForm } from "@inertiajs/react";

export default function ProviderShow({ user, products }) {
  const { data, prev_page_url, next_page_url, current_page, last_page } = products;

  return (
    <ProfileLayout user={user}>
      <div className="flex flex-col min-h-full">
        <div className="">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Product name</th>
                <th className="py-2 px-4 border-b">Product description</th>
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
                    <img
                      width={100}
                      height={100}
                      src={`/storage/products/${product.image}`}
                      alt={"default"}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{product.price}€</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      href="#"
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
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
