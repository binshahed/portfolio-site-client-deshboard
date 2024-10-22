import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAddProjectsMutation } from "../../store/app/features/projects/projectsApi"; // Ensure this API mutation is implemented
import axios from "axios";
import envConfig from "../../config";

// Define the type for form data
interface FormData {
  name: string;
  description: string;
  liveLink: string;
  clientGitLink: string;
  serverGitLink: string;
  technology: string[]; // Change this to string[] to match your use case
  imageUrl: string;
}

export function AddProjectModal() {
  const [addProject, { data, isLoading }] = useAddProjectsMutation(); // Ensure this mutation is implemented
  const [openModal, setOpenModal] = useState(false);

  // Initialize formData with the defined type
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    liveLink: "",
    clientGitLink: "",
    serverGitLink: "",
    technology: [], // Ensure this is an array of strings
    imageUrl: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Optional chaining for safer file access
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

    let imageUrl = "";
    if (imageFile) {
      const uploadedImageUrl = await uploadImage(imageFile); // Upload image
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl; // Use new image URL
      }
    }

    const newProjectData = {
      ...formData,
      imageUrl // Include the image URL in the data to be created
    };

    await addProject(newProjectData); // Call the add project mutation
    setOpenModal(false); // Close the modal after submission
    setFormData({
      // Reset form data
      name: "",
      description: "",
      liveLink: "",
      clientGitLink: "",
      serverGitLink: "",
      technology: [], // Reset technology to an empty array
      imageUrl: ""
    });
    setImageFile(null); // Clear the image file
    setImagePreview(""); // Clear the image preview
  };

  return (
    <>
      <Button className="mb-2" onClick={() => setOpenModal(true)}>
        <FaPlus className="m-1" /> Add Project
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add New Project</Modal.Header>
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
                    technology: techArray // Update technology as an array of strings
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
            <Modal.Footer>
              <Button type="submit" disabled={isLoading}>
                Add Project
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
