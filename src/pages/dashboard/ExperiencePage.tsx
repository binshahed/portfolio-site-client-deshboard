import React from "react";
import { UpdateExperienceModal } from "../../components/modals/UpdateExperienceModal";
import { Button } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import {
  useDeleteExperienceMutation,
  useGetAllExperienceQuery
} from "../../store/app/features/Experience/experienceApi";
import { AddExperienceModal } from "../../components/modals/AddExperienceModal";

const ExperiencePage = () => {
  const { data } = useGetAllExperienceQuery(undefined);
  const [deleteExperience] = useDeleteExperienceMutation();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="font-bold text-2xl my-5 text-center">Experience Page</h2>
      <AddExperienceModal />
      <div className="relative overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Company Name
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Designation
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Start Date
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                End Date
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Responsibilities
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6 w-52">
                Technologies
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Achievements
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="space-y-4">
            {data?.data?.map((experience) => (
              <tr
                key={experience?._id}
                className="bg-white border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4 sm:px-6">{experience?.companyName}</td>
                <td className="px-4 py-4 sm:px-6">{experience?.designation}</td>
                <td className="px-4 py-4 sm:px-6">
                  {new Date(experience?.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  {new Date(experience?.endDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <ul className="list-disc pl-5">
                    {experience?.responsibilities?.map(
                      (responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      )
                    )}
                  </ul>
                </td>
                <td className="px-4 py-4 sm:px-6 w-52 space-y-2 flex flex-wrap gap-2">
                  {experience?.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  {experience?.achievements || "No achievements listed"}
                </td>
                <td className="px-4 py-4 sm:px-6 flex">
                  <UpdateExperienceModal project={experience} />
                  <Button
                    color="warning"
                    onClick={() => deleteExperience(experience?._id)}
                  >
                    <MdDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExperiencePage;
