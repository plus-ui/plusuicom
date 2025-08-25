import { useState } from "react";
import FormInput from "../auth/FormInput";

export default function ProfileContent() {
  const [profileData, setProfileData] = useState({
    firstName: "Omer",
    lastName: "Duraker",
    username: "omerduraker",
    email: "omer@example.com",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaved(true);
    setLoading(false);

    // Reset saved state after 3 seconds
    setTimeout(() => setSaved(false), 3000);
  };

  const isFormChanged = true; // In real app, compare with original data

  return (
    <div className="mx-auto max-w-4xl py-8">
      {/* Profile Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="text-gray-600">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Profile Form */}
      <div className="">
        <div className="border-b border-gray-200 py-4">
          <h2 className="text-lg font-medium text-gray-900">
            Personal Information
          </h2>
        </div>

        <div className="py-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* First Name */}
            <FormInput
              label="First Name"
              placeholder="Placeholder"
              value={profileData.firstName}
              onChange={(value) =>
                setProfileData((prev) => ({ ...prev, firstName: value }))
              }
            />

            {/* Last Name */}
            <FormInput
              label="Last Name"
              placeholder="Placeholder"
              value={profileData.lastName}
              onChange={(value) =>
                setProfileData((prev) => ({ ...prev, lastName: value }))
              }
            />

            {/* Username */}
            <div className="md:col-span-2">
              <FormInput
                label="Username"
                value={profileData.username}
                onChange={(value) =>
                  setProfileData((prev) => ({ ...prev, username: value }))
                }
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <FormInput
                label="Email"
                type="email"
                placeholder="Placeholder"
                value={profileData.email}
                onChange={(value) =>
                  setProfileData((prev) => ({ ...prev, email: value }))
                }
              />
            </div>
          </div>

          {/* Save button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading || !isFormChanged}
              className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                saved
                  ? "bg-green-600 text-white"
                  : loading || !isFormChanged
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              } `}
            >
              {loading ? (
                <>
                  <svg
                    className="mr-2 -ml-1 inline h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : saved ? (
                <>
                  <svg
                    className="mr-2 inline h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Saved!
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Account Actions</h2>
        </div>

        <div className="space-y-6 px-6 py-6">
          {/* Change Password */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Password</h3>
              <p className="text-sm text-gray-500">
                Update your password to keep your account secure.
              </p>
            </div>
            <button className="rounded-lg border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors duration-200 hover:border-indigo-700 hover:text-indigo-700">
              Change Password
            </button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account.
              </p>
            </div>
            <button className="rounded-lg border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors duration-200 hover:border-indigo-700 hover:text-indigo-700">
              Enable 2FA
            </button>
          </div>

          {/* Export Data */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Export Data</h3>
              <p className="text-sm text-gray-500">
                Download a copy of your account data.
              </p>
            </div>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:border-gray-400 hover:text-gray-700">
              Export Data
            </button>
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div>
              <h3 className="text-sm font-medium text-red-900">
                Delete Account
              </h3>
              <p className="text-sm text-gray-500">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <button className="rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-200 hover:border-red-700 hover:text-red-700">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
