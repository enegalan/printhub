import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import AvatarDelete from "@/Components/AvatarDelete";
import TextInput from './TextInput';

const AvatarUpload = ({ user }) => {
  const { url } = usePage();
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedAvatar = e.target.files[0];
    setAvatar(selectedAvatar);

    // Crear un objeto URL para la vista previa
    const objectUrl = URL.createObjectURL(selectedAvatar);
    setPreviewUrl(objectUrl);
  };

  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      // Esperar a que la solicitud se complete antes de continuar
      await window.axios.post('/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
      window.location.href = '/profile';
    } catch (error) {
      console.error('Error al subir el avatar:', error);
      // Manejar el error si es necesario
    }
  };

  const handleUpload = () => {
    uploadAvatar();
  };

  return (
    <div className='mt-2 flex flex-col md:flex-row justify-between'>
      <div className="flex flex-col justify-between">
        <div>
          <TextInput
              id="file_input"
              type="file"
              name="file"
              className="mt-2 mb-3 block shadow-transparent text-slate-500
                file:mr-4 file:py-2 file:px-10
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 file:cursor-pointer"
              autoComplete="file"
              onChange={handleFileChange}
            />
        </div>
        <div className='flex flex-col self-start items-center'>
          {previewUrl && <img src={previewUrl} alt="Preview" className="mb-4 w-[100px] h-[100px] rounded-full border-2 border-slate-200" />}

          <button
            className={`inline-flex items-center px-4 py-2 bg-[var(--blue)] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:border-white focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${!previewUrl || !avatar ? 'opacity-75' : ''}`}
            onClick={handleUpload}
            disabled={!previewUrl || !avatar}
          >
            Upload Avatar
          </button>
        </div>
      </div>
      <hr className='mt-4'/>
      <AvatarDelete user={user} reloadPage={handleUpload} />
    </div>
  );
};

export default AvatarUpload;
