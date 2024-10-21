import { TUserLogin } from "../../../../types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo: TUserLogin) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo
      })
    })
  })
});

export const { useLoginMutation } = authApi;
