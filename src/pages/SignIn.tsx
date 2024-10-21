import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { FormProps } from "react-hook-form";
import { setUser } from "../store/app/features/auth/authSlice";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type FieldType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await login(values).unwrap();
    const user = (await verifyToken(res.data.accessToken)) as TUserData;
    dispatch(
      setUser({
        user: user,
        token: res.data.accessToken
      })
    );

    toast.success("Login successful");

    navigate(`/${user?.data.role}/dashboard`);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const getErrorMessage = (error: FetchBaseQueryError | { error: string }) => {
    if ("data" in error) {
      return (error.data as { message?: string }).message ?? "Unknown error";
    }
    return error.error;
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 ">
            Sign in to our platform
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login to your account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
