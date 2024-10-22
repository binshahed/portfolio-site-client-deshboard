import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useUpdateBlogMutation } from "../../store/app/features/Blog/blogApi";
import envConfig from "../../config";

export function UpdateBlogModal({ blog }) {
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    featuredImage: ""
  });

  // Initialize formData when the blog prop changes
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        content: blog.content || "",
        featuredImage: blog.featuredImage || ""
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      // Replace this with your image upload logic (e.g., call to ImageBB API)
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${envConfig.imageBB}`,
        {
          method: "POST",
          body: formData
        }
      );
      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          featuredImage: data.data.url // Set the uploaded image URL in formData
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBlog({ data: formData, id: blog._id }); // Send updated blog data
    setOpenModal(false); // Close the modal after submission
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <FaEdit />
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Update Blog</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="title">Title</Label>
              <TextInput
                type="text"
                id="title"
                name="title"
                placeholder="Enter blog title"
                value={formData.title} // Ensure this links to formData
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
                value={formData.slug} // Ensure this links to formData
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="content">Content</Label>
              <ReactQuill
                id="content"
                value={formData.content} // Ensure this links to formData
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="Write your blog content here..."
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <input
                type="file"
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
              {formData.featuredImage && (
                <div className="mt-2">
                  <img
                    src={formData.featuredImage}
                    alt="Preview"
                    className="w-full h-auto rounded"
                  />
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            Save Changes
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
