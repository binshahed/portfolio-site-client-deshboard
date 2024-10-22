import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Textarea
} from "flowbite-react";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useUpdateExperienceMutation } from "../../store/app/features/Experience/experienceApi";

export function UpdateExperienceModal({ project }) {
  const [updateExperience, { isLoading }] = useUpdateExperienceMutation();
  const [openModal, setOpenModal] = useState(false);
  const [currentlyWorking, setCurrentlyWorking] = useState(
    project.endDate === "Present"
  );

  const [formData, setFormData] = useState({
    companyName: project.companyName || "",
    designation: project.designation || "",
    startDate: project.startDate || "",
    endDate: project.endDate === "Present" ? "" : project.endDate || "",
    responsibilities: project.responsibilities || [],
    technologies: project.technologies || [],
    achievements: project.achievements || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResponsibilitiesChange = (e) => {
    const responsibilitiesArray = e.target.value
      .split(",")
      .map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      responsibilities: responsibilitiesArray
    }));
  };

  const handleTechnologiesChange = (e) => {
    const techArray = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      technologies: techArray
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentlyWorking) {
      formData.endDate = "Present";
    }

    await updateExperience({ data: formData, id: project._id });
    setOpenModal(false); // Close the modal after submission
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <FaEdit />
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Update Experience</Modal.Header>
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
              <Label className="mr-2" htmlFor="currentlyWorking">
                Currently working?
              </Label>
              <Checkbox
                id="currentlyWorking"
                checked={currentlyWorking}
                onChange={(e) => setCurrentlyWorking(e.target.checked)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="endDate">End Date</Label>
              <TextInput
                type="date"
                id="endDate"
                name="endDate"
                value={currentlyWorking ? "" : formData.endDate}
                onChange={handleChange}
                disabled={currentlyWorking} // Disable input if currently working
                required={!currentlyWorking} // Only required if not currently working
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
