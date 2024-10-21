import React from "react";
import { Navigate } from "react-router-dom";

import { ReactNode } from "react";
import { useAppSelector } from "../store/hooks";
import { useCurrentToken } from "../store/app/features/auth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to="/sign-in" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
