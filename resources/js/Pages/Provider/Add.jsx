import React, { useEffect, useState } from "react";
import ProfileLayout from "@/Layouts/ProfileLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/inertia-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "@inertiajs/react";
import toast, { Toaster } from 'react-hot-toast';

export default function ProviderDashboard({ user, categories = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    description: "",
    image: null,
    price: "",
    categories: [],
    user_id: user.id,
  });
  const onAdd = () => {
    toast.success('Product added successfully');
  }

  const onError = (e) => {
    toast.error('Error adding product');
  }
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setData("image", selectedImage);

    // Create an object URL for the preview
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);
  };
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("price", data.price);
    formData.append("categories", data.categories);
    formData.append("user_id", data.user_id);
    try {
      post(route("product.store"));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <ProfileLayout user={user} pageName="Provider" pageSubtitle="Add new product">
      <Link href={route('profile.provider')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-start transition hover:bg-[#bbbbbb]">
          <IoMdArrowRoundBack />
      </Link>
      <Toaster />
      <h1 className="text-2xl mb-5 text-center">Add new product</h1>
      <div className="row-span-4 bg-white rounded-xl p-4 lg:mx-20">
        <form
          className="px-10 py-5 flex flex-col gap-5"
          onSubmit={submit}
          encType="multipart/form-data"
        >
          <div>
            <InputLabel forInput="name" value="Product name*" className="" />
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
            <InputLabel value="Description" className="" />
            <textarea
              id="description"
              name="description"
              value={data.description}
              className="mt-1 block w-full border-gray-300 focus:border-blue-400 focus:ring-blue-400 rounded-md shadow-sm"
              autoComplete="description"
              isFocused={true}
              onChange={(e) => setData("description", e.target.value)}
              rows="5"
              placeholder="Maximun 255 chararcters"
            />
            <InputError message={errors.description} className="mt-2" />
          </div>
          <div>
            <InputLabel
              forInput="image"
              value="Choose an image*"
              className="font-medium text-gray-900"
            />
            <TextInput
              id="image"
              type="file"
              name="image"
              className="mt-1 block shadow-transparent text-slate-500
                file:mr-4 file:py-2 file:px-10
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 "
              autoComplete="image"
              isFocused={true}
              onChange={handleFileChange}
              required
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Image Preview"
                className="mt-2 w-32 h-32"
              />
            )}
            <InputError message={errors.image} className="mt-2" />
          </div>
          <div>
            <InputLabel
              forInput="price"
              value="Set price*"
              className="font-medium text-gray-900"
            />
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
            </div>
            <InputError message={errors.price} className="mt-2" />
          </div>
          <div>
            <InputLabel
              forInput="categories"
              value="Choose categories"
              className="font-medium text-gray-900"
            />
            <div className="flex gap-2 flex-col">
              {categories.map((category, index) => (
                <div key={index} className="flex gap-2">
                  <TextInput
                    id="categories"
                    type="checkbox"
                    name="categories[]"
                    value={data.categories.includes(category.id)}
                    className="mt-1"
                    autoComplete="categories"
                    isFocused={true}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setData(
                        "categories",
                        isChecked
                          ? [...data.categories, category.id]
                          : data.categories.filter((id) => id !== category.id)
                      );
                    }}
                  />
                  <label> {category.name.charAt(0).toUpperCase() + category.name.slice(1)}</label>
                </div>
              ))}
            </div>
            <InputError message={errors.categories} className="mt-2" />
          </div>
          <div>
            <button className="rounded bg-blue-500 text-white px-5 py-2 font-medium">
              Submit product
            </button>
          </div>
        </form>
      </div>
    </ProfileLayout>
  );
}