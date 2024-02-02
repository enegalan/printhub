import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard"
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/inertia-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "@inertiajs/react";
import toast, { Toaster } from 'react-hot-toast';

export default function Add({ user, roles = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    lastname: "",
    birthdate: "",
    avatar: "",
    email: "",
    password: "",
    roles: [],
  });
  
  const onAdd = () => {
    toast.success('User created successfully');
  }

  const onError = (e) => {
    toast.error('Error creating user');
  }
  const [previewUrl, setPreviewUrl] = useState(null);
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    setData("avatar", selectedImage);

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
    formData.append("lastname", data.lastname);
    formData.append("birthdate", data.birthdate);
    formData.append("password", data.password);
    formData.append("roles", JSON.stringify(data.roles));
    try {
      post(route("admin.user.store"));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <Dashboard pageName="Users" pageSubtitle="Manage PrintHub users">
      <Link href={route('admin.users')} className="bg-[lightgrey] w-[40px] p-3 rounded-lg mb-5 self-start transition hover:bg-[#bbbbbb]">
          <IoMdArrowRoundBack />
      </Link>
      <Toaster />
      <h1 className="text-2xl mb-5 text-center">Add user</h1>
      <div className="row-span-4 bg-white rounded-xl p-4 lg:mx-20">
        <form
          className="px-10 py-5 flex flex-col gap-5"
          onSubmit={submit}
          encType="multipart/form-data"
        >
          <div>
            <InputLabel forInput="name" value="Name*" className="" />
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
            <InputLabel forInput="lastname" value="Last name*" className="" />
            <TextInput
              id="lastname"
              name="lastname"
              value={data.lastname}
              className="mt-1 block w-full"
              autoComplete="lastname"
              isFocused={true}
              onChange={(e) => setData("lastname", e.target.value)}
              required
            />
            <InputError message={errors.lastname} className="mt-2" />
          </div>
          <div>
            <InputLabel forInput="birthdate" value="Birthdate*" className="" />
            <TextInput
              id="birthdate"
              type="date"
              name="birthdate"
              value={data.birthdate}
              className="mt-1 block w-full"
              autoComplete="birthdate"
              isFocused={true}
              onChange={(e) => setData("birthdate", e.target.value)}
              required
            />
            <InputError message={errors.birthdate} className="mt-2" />
          </div>
          <div>
            <InputLabel
              forInput="avatar"
              value="Add an avatar"
              className="font-medium text-gray-900"
            />
            <TextInput
              id="avatar"
              type="file"
              name="avatar"
              className="mt-1 block shadow-transparent text-slate-500
                file:mr-4 file:py-2 file:px-10
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 "
              autoComplete="image"
              isFocused={true}
              onChange={handleFileChange}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Image Preview"
                className="mt-2 w-32 h-32"
              />
            )}
            <InputError message={errors.avatar} className="mt-2" />
          </div>
          <div>
            <InputLabel forInput="email" value="E-mail*" className="" />
            <TextInput
              id="email"
              name="email"
              type="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="email"
              isFocused={true}
              onChange={(e) => setData("email", e.target.value)}
              required
            />
            <InputError message={errors.email} className="mt-2" />
          </div>
          <div>
            <InputLabel forInput="password" value="Password*" className="" />
            <TextInput
              id="password"
              name="password"
              type="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="password"
              isFocused={true}
              onChange={(e) => setData("password", e.target.value)}
              required
            />
            <InputError message={errors.password} className="mt-2" />
          </div>
          <div>
            <InputLabel
              forInput="roles"
              value="Choose role(s)"
              className="font-medium text-gray-900"
            />
            <div className="flex gap-2 flex-col">
              {roles.map((role, index) => (
                <div key={index} className="flex gap-2">
                  <TextInput
                    id="roles"
                    type="checkbox"
                    name="roles[]"
                    value={data.roles}
                    className="mt-1"
                    isFocused={true}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setData(
                        "roles",
                        isChecked
                          ? [...data.roles, role.id]
                          : data.roles.filter((id) => id !== role.id)
                      );
                    }}
                  />
                  <label> {role.name.charAt(0).toUpperCase() + role.name.slice(1)}</label>
                </div>
              ))}
            </div>
            <InputError message={errors.roles} className="mt-2" />
          </div>
          <div>
            <button className="rounded bg-blue-500 text-white px-5 py-2 font-medium">
              Submit user
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
}