import { baseApi } from "../../api/baseApi";

const personalInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalInfo: builder.query({
      query: () => ({
        url: "/personalInfo",
        method: "GET"
      })
    }),
    updatePersonalInfo: builder.mutation({
      query: (personalInfo) => ({
        url: "/personalInfo/TE",
        method: "PATCH",
        body: personalInfo
      })
    })
  })
});

export const { useGetPersonalInfoQuery, useUpdatePersonalInfoMutation } =
  personalInfoApi;
