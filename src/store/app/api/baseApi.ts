import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { logout, setUser } from "../features/auth/authSlice";

import { TError, TResSuccess } from "../../../types/global.Type";
import { toast } from "sonner";

// Utility function for handling success responses
const handleSuccessResponse = (result: TResSuccess) => {
  const successMessage = result.data?.message || "Operation successful";
  toast.success(successMessage); // Show success message for 3 seconds
};

// Utility function for handling error responses
const handleErrorResponse = (errorRes: TError) => {
  if (errorRes?.data?.errorSources?.length > 0) {
    errorRes.data.errorSources.forEach((error) => {
      toast.error(error.message); // Show error message for 5 seconds
    });
  } else {
    const errorMessage =
      errorRes?.data?.message || "An unexpected error occurred";
    toast.error(errorMessage); // Show generic error message for 5 seconds
  }
};

// Base query setup with token management and refresh logic
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = `Bearer ${(getState() as RootState).auth.token}`;

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  }
});

const BaseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Initial API call
  let result = await baseQuery(args, api, extraOptions);

  console.log("result", result);

  // Handle success response
  if ((result as TResSuccess)?.data?.success) {
    handleSuccessResponse(result as TResSuccess);
  }

  // Handle error response
  if (result.error) {
    handleErrorResponse(result.error as TError);
  }

  // Handle token expiration (401 Unauthorized)
  if (result.error?.status === 401) {
    try {
      // Attempt to refresh the token
      const res = await fetch(
        "http://localhost:5000/api/v1/auth/refresh-token",
        {
          method: "POST",
          credentials: "include"
        }
      );
      const data = await res.json();

      // If a new access token is received, update the Redux store and retry the original request
      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(setUser({ user, token: data.data.accessToken }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        // If refresh token is expired, log out the user
        api.dispatch(logout());
      }
    } catch (refreshError) {
      // Handle errors during the token refresh process
      toast.error("Session expired. Please log in again.");
      api.dispatch(logout());
    }
  }

  return result;
};

// API slice configuration
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: BaseQueryWithRefreshToken,
  tagTypes: [
    "AcademicSemester",
    "academicFaculty",
    "AcademicDepartment",
    "Student",
    "SemesterRegistration",
    "course"
  ],
  endpoints: () => ({})
});
