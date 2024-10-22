import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

import axios from "axios";
import envConfig from "../../config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useAddBlogMutation } from "../../store/app/features/Blog/blogApi";

// Define the type for form data
interface FormData {
  title: string;
  slug: string;
  content: string;
  featuredImage: string;
}

export function AddBlogModal() {
  const [addBlog, { data, isLoading }] = useAddBlogMutation(); // Ensure this mutation is implemented
  const [openModal, setOpenModal] = useState(false);

  // Initialize formData with the defined type
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    content: "",
    featuredImage: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: envConfig.imageBB // Use your ImageBB API key
          }
        }
      );
      return response.data.data.url; // Return the image URL from the response
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let featuredImage = "";
    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile); // Upload image
      if (uploadedImageUrl) {
        featuredImage = uploadedImageUrl; // Use new image URL
      }
    }

    const newBlogData = {
      ...formData,
      featuredImage // Include the image URL in the data to be created
    };

    await addBlog(newBlogData); // Call the add blog mutation
    setOpenModal(false); // Close the modal after submission
    setFormData({
      // Reset form data
      title: "",
      slug: "",
      content: "",
      featuredImage: ""
    });
    setImageFile(null); // Clear the image file
    setImagePreview(""); // Clear the image preview
  };

  return (
    <>
      <Button className="mb-2" onClick={() => setOpenModal(true)}>
        <FaPlus className="m-1" /> Add Blog
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add New Blog</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="title">Title</Label>
              <TextInput
                type="text"
                id="title"
                name="title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="slug">Slug</Label>
              <TextInput
                type="text"
                id="slug"
                name="slug"
                placeholder="Enter blog slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="content">Content</Label>
              <ReactQuill
                id="content"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="Write your blog content here..."
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="imageUpload">Upload Featured Image</Label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="mt-2 w-24 h-24 object-cover border"
                />
              )}
            </div>
            <Modal.Footer>
              <Button type="submit" disabled={isLoading}>
                Add Blog
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
