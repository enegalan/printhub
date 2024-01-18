import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import AvatarUpload from "@/Components/AvatarUpload";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import ProfileLayout from "@/Layouts/ProfileLayout";

export default function Edit({ auth, mustVerifyEmail, status }) {
  return (
    <ProfileLayout user={auth.user} pageName="Account section" pageSubtitle="Manage your account profile">
      <div className="">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-xl"
            />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <header>
              <h2 className="text-lg font-medium text-gray-900">
                Upload Profile Picture
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Upload or update your account's profile picture.
              </p>
            </header>

            <AvatarUpload user={auth.user}></AvatarUpload>
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            <DeleteUserForm className="max-w-xl" />
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
