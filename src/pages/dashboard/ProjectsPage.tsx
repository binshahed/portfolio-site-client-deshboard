import React from "react";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery
} from "../../store/app/features/projects/projectsApi";
import { UpdateProjectModal } from "./../../components/modals/UpdateProjectModal";
import { AddProjectModal } from "../../components/modals/AddProjectModal";
import { Button } from "flowbite-react";
import { MdDelete } from "react-icons/md";

const ProjectsPage = () => {
  const { data } = useGetAllProjectsQuery(undefined);
  const [deleteProject] = useDeleteProjectMutation();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="font-bold text-2xl my-5 text-center">Projects Page</h2>
      <AddProjectModal />
      <div className="relative overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Image
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Project Name
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Description
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6 w-52">
                Technology
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Link
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
                    className="w-24 h-24 object-cover"
                  />
                </td>
                <td className="px-4 py-4 sm:px-6">{project?.name}</td>
                <td className="px-4 py-4 sm:px-6">{project?.description}</td>
                <td className="px-4 py-4 sm:px-6 w-52 space-y-2 flex flex-wrap gap-2">
                  {project?.technology?.map((item, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <a
                    href={project?.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {project?.liveLink}
                  </a>
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <UpdateProjectModal project={project} />
                  <Button
                    color="warning"
                    onClick={() => deleteProject(project?._id)}
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

export default ProjectsPage;
