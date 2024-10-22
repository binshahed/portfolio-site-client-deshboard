import { baseApi } from "../../api/baseApi";

const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET"
      }),
      providesTags: ["projects"]
    }),
    addProjects: builder.mutation({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project
      }),
      invalidatesTags: ["projects"]
    }),
    updateProjects: builder.mutation({
      query: ({ data, id }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["projects"]
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["projects"]
    })
  })
});

export const {
  useAddProjectsMutation,
  useGetAllProjectsQuery,
  useUpdateProjectsMutation,
  useDeleteProjectMutation
} = projectsApi;
