import React, { useEffect, useState } from "react";
import {
  useGetPersonalInfoQuery,
  useUpdatePersonalInfoMutation
} from "../../store/app/features/personalInfo/personalInfoApi";

const HomePage = () => {
  const { data, isLoading, isError } = useGetPersonalInfoQuery(undefined);
  const [
    updatePersonalInfo,
    { isLoading: isUpdating, isError: isUpdateError }
  ] = useUpdatePersonalInfoMutation();
  const userInfo = data?.data;

  // Initialize state with default values
  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
    profilePicture: "",
    bio: "",
    aboutMe: "",
    contact: {
      // Nesting contact fields here
      email: "",
      phone: "",
      address: "",
      github: ""
    }
  });

  useEffect(() => {
    if (userInfo) {
      // Update form values only when userInfo is available
      setFormValues({
        name: userInfo.name || "",
        title: userInfo.title || "",
        profilePicture: userInfo.profilePicture || "",
        bio: userInfo.bio || "",
        aboutMe: userInfo.aboutMe || "",
        contact: {
          // Updating nested contact fields
          email: userInfo.contact?.email || "",
          phone: userInfo.contact?.phone || "",
          address: userInfo.contact?.address || "",
          github: userInfo.contact?.github || ""
        }
      });
    }
  }, [userInfo]); // Run effect when userInfo changes

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id in formValues) {
      // Update fields in the main formValues object
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: value
      }));
    } else {
      // Update fields in the nested contact object
      setFormValues((prevValues) => ({
        ...prevValues,
        contact: {
          ...prevValues.contact,
          [id]: value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the mutation to update the personal info
      await updatePersonalInfo(formValues).unwrap();
      console.log("Form submitted successfully:", formValues);
      // Optionally reset the form or show a success message
    } catch (error) {
      console.error("Error updating personal information:", error);
      // Optionally show an error message
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="font-bold text-2xl my-5 text-center">Home Page</h2>

      {/* Handle loading state */}
      {isLoading && (
        <div className="text-center text-blue-600 font-semibold">
          Loading user information...
        </div>
      )}

      {/* Handle error state */}
      {isError && (
        <div className="text-center text-red-600 font-semibold">
          Error loading data: {"Something went wrong!"}
        </div>
      )}

      {/* Show the form only if we have user data */}
      {userInfo && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formValues.name}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formValues.title}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="profilePicture"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Profile Picture URL
              </label>
              <input
                type="text"
                id="profilePicture"
                value={formValues.profilePicture}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Bio
              </label>
              <textarea
                id="bio"
                value={formValues.bio}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                rows={3}
              />
            </div>

            <div>
              <label
                htmlFor="aboutMe"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                About Me
              </label>
              <textarea
                id="aboutMe"
                value={formValues.aboutMe}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                rows={3}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formValues.contact.email} // Access nested value
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={formValues.contact.phone} // Access nested value
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="github"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                GitHub
              </label>
              <input
                type="text"
                id="github"
                value={formValues.contact.github} // Access nested value
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={formValues.contact.address} // Access nested value
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={isUpdating} // Disable button while updating
          >
            {isUpdating ? "Updating..." : "Submit"}
          </button>

          {/* Show error message if update fails */}
          {isUpdateError && (
            <div className="text-red-600 font-semibold mt-4">
              Error updating information: {"Something went wrong!"}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default HomePage;
