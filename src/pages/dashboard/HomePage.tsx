import React, { useEffect, useState } from "react";
import {
  useGetPersonalInfoQuery,
  useUpdatePersonalInfoMutation
} from "../../store/app/features/personalInfo/personalInfoApi";
import envConfig from "../../config";

const HomePage = () => {
  const { data, isLoading, isError } = useGetPersonalInfoQuery(undefined);
  const [
    updatePersonalInfo,
    { isLoading: isUpdating, isError: isUpdateError }
  ] = useUpdatePersonalInfoMutation();
  const userInfo = data?.data;

  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
    profilePicture: "",
    bio: "",
    aboutMe: "",
    contact: {
      email: "",
      phone: "",
      address: "",
      github: ""
    }
  });

  const [imagePreview, setImagePreview] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setFormValues({
        name: userInfo.name || "",
        title: userInfo.title || "",
        profilePicture: userInfo.profilePicture || "",
        bio: userInfo.bio || "",
        aboutMe: userInfo.aboutMe || "",
        contact: {
          email: userInfo.contact?.email || "",
          phone: userInfo.contact?.phone || "",
          address: userInfo.contact?.address || "",
          github: userInfo.contact?.github || ""
        }
      });
      setImagePreview(userInfo.profilePicture || "");
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id in formValues) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: value
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        contact: {
          ...prevValues.contact,
          [id]: value
        }
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader?.result as any);
      };
      reader.readAsDataURL(file);

      // Upload image to ImageBB
      uploadImageToImageBB(file);
    }
  };

  const uploadImageToImageBB = async (file) => {
    setIsUploadingImage(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${envConfig.imageBB}`,
        {
          method: "POST",
          body: formData
        }
      );
      const result = await res.json();
      const imageUrl = result.data.url;

      // Update formValues with the image URL
      setFormValues((prevValues) => ({
        ...prevValues,
        profilePicture: imageUrl
      }));

      setIsUploadingImage(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePersonalInfo(formValues).unwrap();
      console.log("Form submitted successfully:", formValues);
    } catch (error) {
      console.error("Error updating personal information:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="font-bold text-2xl my-5 text-center">Home Page</h2>

      {isLoading && (
        <div className="text-center text-blue-600 font-semibold">
          Loading user information...
        </div>
      )}

      {isError && (
        <div className="text-center text-red-600 font-semibold">
          Error loading data: {"Something went wrong!"}
        </div>
      )}

      {userInfo && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
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

            {/* Title */}
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
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

            {/* Profile Picture */}
            <div>
              <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900">
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                onChange={handleImageChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              {/* Preview */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="mt-4 w-32 h-32 rounded-full object-cover"
                />
              )}
              {isUploadingImage && (
                <p className="text-blue-600 font-semibold mt-2">Uploading image...</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900">
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

            {/* About Me */}
            <div>
              <label htmlFor="aboutMe" className="block mb-2 text-sm font-medium text-gray-900">
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

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formValues.contact.email}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={formValues.contact.phone}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* GitHub */}
            <div>
              <label htmlFor="github" className="block mb-2 text-sm font-medium text-gray-900">
                GitHub
              </label>
              <input
                type="text"
                id="github"
                value={formValues.contact.github}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={formValues.contact.address}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={isUpdating || isUploadingImage}
          >
            {isUpdating || isUploadingImage ? "Updating..." : "Submit"}
          </button>

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
