import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAddProjectsMutation } from "../../store/app/features/projects/projectsApi"; // Ensure this API mutation is implemented
import axios from "axios";
import envConfig from "../../config";
import { useAddSkillMutation } from "../../store/app/features/Skills/skillsApi";

// Define the type for form data
interface FormData {
  name: string;

  imageUrl: string;
}

export function AddSkillModal() {
  const [addSkill, { data, isLoading }] = useAddSkillMutation(); // Ensure this mutation is implemented
  const [openModal, setOpenModal] = useState(false);

  // Initialize formData with the defined type
  const [formData, setFormData] = useState<FormData>({
    name: "",
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

    await addSkill(newProjectData); // Call the add project mutation
    setOpenModal(false); // Close the modal after submission
    setFormData({
      // Reset form data
      name: "",

      imageUrl: ""
    });
    setImageFile(null); // Clear the image file
    setImagePreview(""); // Clear the image preview
  };

  return (
    <>
      <Button className="mb-2" onClick={() => setOpenModal(true)}>
        <FaPlus className="m-1" /> Add Skill
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add New Skill</Modal.Header>
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
                Add Skill
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
