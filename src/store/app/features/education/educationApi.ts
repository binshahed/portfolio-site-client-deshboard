import { baseApi } from "../../api/baseApi";

const educationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEducation: builder.query({
      query: () => ({
        url: "/education",
        method: "GET"
      }),
      providesTags: ["education"]
    }),
    addEducation: builder.mutation({
      query: (project) => ({
        url: "/education",
        method: "POST",
        body: project
      }),
      invalidatesTags: ["education"]
    }),
    updateEducation: builder.mutation({
      query: ({ data, id }) => ({
        url: `/education/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["education"]
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/education/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["education"]
    })
  })
});

export const {
  useAddEducationMutation,
  useDeleteEducationMutation,
  useGetAllEducationQuery,
  useUpdateEducationMutation
} = educationApi;
