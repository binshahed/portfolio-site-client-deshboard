import { baseApi } from "../../api/baseApi";

const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSkills: builder.query({
      query: () => ({
        url: "/skills",
        method: "GET"
      }),
      providesTags: ["skill"]
    }),
    addSkill: builder.mutation({
      query: (project) => ({
        url: "/skills",
        method: "POST",
        body: project
      }),
      invalidatesTags: ["skill"]
    }),
    updateSkill: builder.mutation({
      query: ({ data, id }) => ({
        url: `/skills/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["skill"]
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["skill"]
    })
  })
});

export const {
  useAddSkillMutation,
  useDeleteSkillMutation,
  useGetAllSkillsQuery,
  useUpdateSkillMutation
} = skillsApi;
