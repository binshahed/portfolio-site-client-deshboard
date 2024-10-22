import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useUpdateProjectsMutation } from "../../store/app/features/projects/projectsApi";
import axios from "axios";
import envConfig from "../../config";

export function UpdateProjectModal({ project }) {
  const [updateProject, { data, isLoading }] = useUpdateProjectsMutation();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name || "",
    description: project.description || "",
    liveLink: project.liveLink || "",
    clientGitLink: project.clientGitLink || "",
    serverGitLink: project.serverGitLink || "",
    technology: project.technology || [],
    imageUrl: project.imageUrl || "" // Add the image URL field
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(project.imageUrl || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: envConfig.imageBB // Replace with your ImageBB API key
          }
        }
      );
      return response.data.data.url; // Return the image URL from the response
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = formData.imageUrl; // Keep existing image URL
    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile); // Upload image
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl; // Use new image URL
      }
    }

    const updatedData = {
      ...formData,
      imageUrl // Include the image URL in the data to be updated
    };

    await updateProject({ data: updatedData, id: project._id });
    setOpenModal(false); // Close the modal after submission
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <FaEdit />
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Update Project</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name">Project Name</Label>
              <TextInput
                type="text"
                id="name"
                name="name"
                placeholder="Enter project name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter project description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="liveLink">Live Link</Label>
              <TextInput
                type="url"
                id="liveLink"
                name="liveLink"
                placeholder="Enter live project link"
                value={formData.liveLink}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="clientGitLink">Client Git Link</Label>
              <TextInput
                type="url"
                id="clientGitLink"
                name="clientGitLink"
                placeholder="Enter client Git repository link"
                value={formData.clientGitLink}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="serverGitLink">Server Git Link</Label>
              <TextInput
                type="url"
                id="serverGitLink"
                name="serverGitLink"
                placeholder="Enter server Git repository link"
                value={formData.serverGitLink}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="technology">Technologies</Label>
              <TextInput
                type="text"
                id="technology"
                name="technology"
                placeholder="Enter technologies (comma separated)"
                value={formData.technology.join(", ")}
                onChange={(e) => {
                  const techArray = e.target.value
                    .split(",")
                    .map((item) => item.trim());
                  setFormData((prev) => ({
                    ...prev,
                    technology: techArray
                  }));
                }}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="imageUpload">Upload Image</Label>
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
