import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useUpdateEducationMutation } from "../../store/app/features/education/educationApi";

export function UpdateEducationModal({ education }) {
  const [updateEducation, { isLoading }] = useUpdateEducationMutation();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    department: education.department || "",
    institute: education.institute || "",
    degree: education.degree || "",
    startYear: education.startYear || "",
    endYear: education.endYear || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEducation({ data: formData, id: education._id });
    setOpenModal(false); // Close the modal after submission
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <FaEdit />
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Update Education</Modal.Header>
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
