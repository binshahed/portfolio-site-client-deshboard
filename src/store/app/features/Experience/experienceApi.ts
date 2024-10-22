import { baseApi } from "../../api/baseApi";

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExperience: builder.query({
      query: () => ({
        url: "/experience",
        method: "GET"
      }),
      providesTags: ["experience"]
    }),
    addExperience: builder.mutation({
      query: (project) => ({
        url: "/experience",
        method: "POST",
        body: project
      }),
      invalidatesTags: ["experience"]
    }),
    updateExperience: builder.mutation({
      query: ({ data, id }) => ({
        url: `/experience/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["experience"]
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experience/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["experience"]
    })
  })
});

export const {
  useAddExperienceMutation,
  useDeleteExperienceMutation,
  useGetAllExperienceQuery,
  useUpdateExperienceMutation
} = experienceApi;
