import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia-react';

const AvatarDelete = ({ user }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true)

    window.axios.delete('/avatar-delete').then(() => {
        setDeleting(false);
    });

    window.location.href = '/profile';
  };

  return (
    <div className="flex flex-col mt-4 md:mt-0 justify-end items-center">
  {user.avatar ? (
    <img className="w-[100px] self-center h-[100px] rounded-full border-2 border-slate-200" src={`/storage/avatars/${user.avatar}`} alt="Avatar" />
  ) : (
    <div className="w-[100px] h-[100px] bg-blue-500 rounded-full flex items-center content-center justify-center text-white text-4xl font-bold">
      {user.name[0].toUpperCase() + user.lastname[0].toUpperCase()}
    </div>
  )}
  <button
  className={`inline-flex items-center mt-6 px-4 py-2 bg-red-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:border-white focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${!user.avatar || deleting ? 'opacity-75' : ''}`}
  onClick={handleDelete}
  disabled={!user.avatar || deleting}
>
  {deleting ? 'Deleting...' : 'Delete Avatar'}
</button>

</div>

  );
};

export default AvatarDelete;