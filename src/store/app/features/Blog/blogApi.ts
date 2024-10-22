import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlog: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET"
      }),
      providesTags: ["blog"]
    }),
    addBlog: builder.mutation({
      query: (project) => ({
        url: "/blogs",
        method: "POST",
        body: project
      }),
      invalidatesTags: ["blog"]
    }),
    updateBlog: builder.mutation({
      query: ({ data, id }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["blog"]
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["blog"]
    })
  })
});

export const {
  useAddBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogQuery,
  useUpdateBlogMutation
} = blogApi;
