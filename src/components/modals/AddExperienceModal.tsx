import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAddExperienceMutation } from "../../store/app/features/Experience/experienceApi"; // Ensure this API mutation is implemented

// Define the type for form data
interface FormData {
  companyName: string;
  designation: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  technologies: string[]; // Change this to string[] to match your use case
  achievements: string;
}

export function AddExperienceModal() {
  const [addExperience, { data, isLoading }] = useAddExperienceMutation(); // Ensure this mutation is implemented
  const [openModal, setOpenModal] = useState(false);

  // Initialize formData with the defined type
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    designation: "",
    startDate: "",
    endDate: "",
    responsibilities: [],
    technologies: [],
    achievements: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResponsibilitiesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const responsibilitiesArray = e.target.value
      .split(",")
      .map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      responsibilities: responsibilitiesArray
    }));
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techArray = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      technologies: techArray
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addExperience(formData); // Call the add experience mutation
    setOpenModal(false); // Close the modal after submission
    setFormData({
      // Reset form data
      companyName: "",
      designation: "",
      startDate: "",
      endDate: "",
      responsibilities: [],
      technologies: [],
      achievements: ""
    });
  };

  return (
    <>
      <Button className="mb-2" onClick={() => setOpenModal(true)}>
        <FaPlus className="m-1" /> Add Experience
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add New Experience</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="companyName">Company Name</Label>
              <TextInput
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="designation">Designation</Label>
              <TextInput
                type="text"
                id="designation"
                name="designation"
                placeholder="Enter designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="startDate">Start Date</Label>
              <TextInput
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="endDate">End Date</Label>
              <TextInput
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="responsibilities">Responsibilities</Label>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                placeholder="Enter responsibilities (comma separated)"
                value={formData.responsibilities.join(", ")}
                onChange={handleResponsibilitiesChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="technologies">Technologies</Label>
              <TextInput
                type="text"
                id="technologies"
                name="technologies"
                placeholder="Enter technologies (comma separated)"
                value={formData.technologies.join(", ")}
                onChange={handleTechnologiesChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="achievements">Achievements</Label>
              <Textarea
                id="achievements"
                name="achievements"
                placeholder="Enter achievements"
                value={formData.achievements}
                onChange={handleChange}
                required
              />
            </div>
            <Modal.Footer>
              <Button type="submit" disabled={isLoading}>
                Add Experience
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
