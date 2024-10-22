import React from "react";
import { Button } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import {
  useDeleteEducationMutation,
  useGetAllEducationQuery
} from "../../store/app/features/education/educationApi";
import { AddEducationModal } from "./../../components/modals/AddEducationModal";
import { UpdateEducationModal } from "./../../components/modals/UpdateEducationModal";

const EducationPage = () => {
  const { data } = useGetAllEducationQuery(undefined); // Fetch all education data
  const [deleteEducation] = useDeleteEducationMutation(); // Hook to delete an education record

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="font-bold text-2xl my-5 text-center">Education Page</h2>
      <AddEducationModal />

      <div className="relative overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Department
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Institute
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Degree
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Start Year
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                End Year
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="space-y-4">
            {data?.data?.map((education) => (
              <tr
                key={education?._id}
                className="bg-white border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4 sm:px-6">{education?.department}</td>
                <td className="px-4 py-4 sm:px-6">{education?.institute}</td>
                <td className="px-4 py-4 sm:px-6">{education?.degree}</td>
                <td className="px-4 py-4 sm:px-6">{education?.startYear}</td>
                <td className="px-4 py-4 sm:px-6">{education?.endYear}</td>
                <td className="px-4 py-4 sm:px-6 flex">
                  <UpdateEducationModal education={education} />
                  <Button
                    color="warning"
                    onClick={() => deleteEducation(education?._id)}
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

export default EducationPage;
