import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAddEducationMutation } from "../../store/app/features/education/educationApi";

interface FormData {
  department: string;
  institute: string;
  degree: string;
  startYear: string;
  endYear: string;
}

export function AddEducationModal() {
  const [addEducation, { data, isLoading }] = useAddEducationMutation(); // Ensure this mutation is implemented
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    department: "",
    institute: "",
    degree: "",
    startYear: "",
    endYear: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addEducation(formData); // Call the add education mutation
    setOpenModal(false); // Close the modal after submission
    setFormData({
      department: "",
      institute: "",
      degree: "",
      startYear: "",
      endYear: ""
    }); // Reset form data
  };

  return (
    <>
      <Button className="mb-2" onClick={() => setOpenModal(true)}>
        <FaPlus className="m-1" /> Add Education
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add New Education</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="department">Department</Label>
              <TextInput
                type="text"
                id="department"
                name="department"
                placeholder="Enter department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="institute">Institute</Label>
              <TextInput
                type="text"
                id="institute"
                name="institute"
                placeholder="Enter institute name"
                value={formData.institute}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="degree">Degree</Label>
              <TextInput
                type="text"
                id="degree"
                name="degree"
                placeholder="Enter degree"
                value={formData.degree}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="startYear">Start Year</Label>
              <TextInput
                type="text"
                id="startYear"
                name="startYear"
                placeholder="Enter start year"
                value={formData.startYear}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="endYear">End Year</Label>
              <TextInput
                type="text"
                id="endYear"
                name="endYear"
                placeholder="Enter end year"
                value={formData.endYear}
                onChange={handleChange}
                required
              />
            </div>
            <Modal.Footer>
              <Button type="submit" disabled={isLoading}>
                Add Education
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
