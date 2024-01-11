import React, { useEffect } from "react";
import ProfileLayout from "@/Layouts/ProfileLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/inertia-react";

export default function ProviderDashboard({ user }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
    image: "",
    price: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route(""));
  };

  return (
    <ProfileLayout user={user} pageName="provider">
        <h1 className="text-2xl mb-5 text-center">Add new product</h1>
      <div className="row-span-4 bg-white rounded-xl p-4 lg:mx-20">
        <form className="px-10 py-5 flex flex-col gap-5" onSubmit={submit}>
              <div>
                <InputLabel forInput="name" value="Product name" className="" />
                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div>
                <InputLabel forInput="description" value="Description" className="" />
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full border-gray-300 focus:border-blue-400 focus:ring-blue-400 rounded-md shadow-sm"
                    autoComplete="description"
                    isFocused={true}
                    onChange={(e) => setData("description", e.target.value)}
                    required
                    rows="5"
                    placeholder="Maximun 255 chararcters"
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div>
                <InputLabel forInput="image" value="Choose a image" className="font-medium text-gray-900" />
                <TextInput
                    id="image"
                    type="file"
                    name="image"
                    value={data.image}
                    className="mt-1 block shadow-transparent text-slate-500
                    file:mr-4 file:py-2 file:px-10
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100 "
                    autoComplete="image"
                    isFocused={true}
                    onChange={(e) => setData("image", e.target.value)}
                    required
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div>
                <InputLabel forInput="price" value="Choose a image" className="font-medium text-gray-900" />
                <div className="flex gap-2">
                <TextInput
                    id="price"
                    type="number"
                    step="any"
                    name="price"
                    value={data.price}
                    className="mt-1 w-full"
                    autoComplete="price"
                    isFocused={true}
                    onChange={(e) => setData("price", e.target.value)}
                    required
                />
                <select name="" id="" className="w-2/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="select">
                    <option disabled selected>Select</option>
                    <option value="">USD</option>
                </select>
                </div>
                <InputError message={errors.price} className="mt-2" />
              </div>
              <div>
                <button className="rounded bg-blue-500 text-white px-5 py-2 font-medium">Submit item</button>
              </div>
        </form>
      </div>
    </ProfileLayout>
  );
}
