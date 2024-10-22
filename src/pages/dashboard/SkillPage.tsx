import React from "react";

import { Button } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import {
  useDeleteSkillMutation,
  useGetAllSkillsQuery
} from "../../store/app/features/Skills/skillsApi";
import { AddSkillModal } from "../../components/modals/AddSkillModal";

const SkillPage = () => {
  const { data } = useGetAllSkillsQuery(undefined);
  const [deleteSkill] = useDeleteSkillMutation();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="font-bold text-2xl my-5 text-center">Skills Page</h2>
      <AddSkillModal />
      <div className="relative overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Image
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Skill Name
              </th>

              <th scope="col" className="px-4 py-3 sm:px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="space-y-4">
            {data?.data?.map((project) => (
              <tr
                key={project?._id}
                className="bg-white border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4 sm:px-6">
                  <img
                    src={project?.imageUrl}
                    alt={project?.name}
                    className="w-10 h-10 object-cover"
                  />
                </td>
                <td className="px-4 py-4 sm:px-6">{project?.name}</td>

                <td className="px-4 py-4 sm:px-6 flex">
                  <Button
                    color="warning"
                    onClick={() => deleteSkill(project?._id)}
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

export default SkillPage;
