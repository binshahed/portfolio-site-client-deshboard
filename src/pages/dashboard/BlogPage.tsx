import React from "react";
import { UpdateBlogModal } from "../../components/modals/UpdateBlogModal";
import { Button } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { AddBlogModal } from "../../components/modals/AddBlogModal";
import {
  useDeleteBlogMutation,
  useGetAllBlogQuery
} from "../../store/app/features/Blog/blogApi";

const BlogPage = () => {
  const { data } = useGetAllBlogQuery(undefined);
  const [deleteBlog] = useDeleteBlogMutation();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="font-bold text-2xl my-5 text-center">Blog Page</h2>
      <AddBlogModal />
      <div className="relative overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Image
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Title
              </th>
              <th scope="col" className="px-4 py-3 sm:px-6">
                Slug
              </th>

              <th scope="col" className="px-4 py-3 sm:px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="space-y-4">
            {data?.data?.map((blog) => (
              <tr
                key={blog?._id}
                className="bg-white border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-4 sm:px-6">
                  <img
                    src={blog?.featuredImage}
                    alt={blog?.name}
                    className="w-24 h-24 object-cover"
                  />
                </td>
                <td className="px-4 py-4 sm:px-6">{blog?.title}</td>
                <td className="px-4 py-4 sm:px-6">{blog?.slug}</td>

                <td className="px-4 py-4 sm:px-6 flex">
                  <UpdateBlogModal blog={blog} />
                  <Button color="warning" onClick={() => deleteBlog(blog?._id)}>
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

export default BlogPage;
