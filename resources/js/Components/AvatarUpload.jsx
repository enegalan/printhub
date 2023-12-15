import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import AvatarDelete from "@/Components/AvatarDelete";

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
    <div className='mt-2 flex justify-between'>
      <div className="flex flex-col justify-between">
        <div>
          <input
            className="block w-75 text-sm text-gray-900 mb-5 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div>
          {previewUrl && <img src={previewUrl} alt="Preview" className="mb-4 w-[100px] h-[100px] rounded-full border-2 border-slate-200" />}

          <button
            className={`inline-flex items-center px-4 py-2 bg-[var(--blue-1)] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:border-white focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${!previewUrl || !avatar ? 'opacity-75' : ''}`}
            onClick={handleUpload}
            disabled={!previewUrl || !avatar}
          >
            Upload Avatar
          </button>
        </div>
      </div>
      <AvatarDelete user={user} reloadPage={handleUpload} />
    </div>
  );
};

export default AvatarUpload;
