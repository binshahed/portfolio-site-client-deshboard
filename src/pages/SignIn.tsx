import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { setUser } from "../store/app/features/auth/authSlice";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useLoginMutation } from "../store/app/features/auth/authApi";
import { verifyToken } from "./../utils/verifyToken";
import { TUserData } from "../types/auth.Types";

type FieldType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldType>();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldType> = async (values) => {
    try {
      const res = await login(values).unwrap();
      console.log(res);

      const user = (await verifyToken(res.token)) as TUserData;
      dispatch(
        setUser({
          user: user,
          token: res.token
        })
      );

      toast.success("Login successful");
      navigate(`/`);
    } catch (error) {
      console.log(
        "Login failed:",
        getErrorMessage(error as FetchBaseQueryError)
      );
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900">
            Sign in to our platform
          </h5>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className={`bg-gray-50 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              placeholder="name@company.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
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
              id="password"
              placeholder="••••••••"
              className={`bg-gray-50 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? "Logging in..." : "Login to your account"}
          </button>

          {isError && (
            <p className="text-red-500 text-sm mt-2">
              {getErrorMessage(error as FetchBaseQueryError)}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
