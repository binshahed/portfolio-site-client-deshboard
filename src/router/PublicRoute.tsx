import React from "react";
import { Navigate } from "react-router-dom";

import { ReactNode } from "react";
import { useAppSelector } from "../store/hooks";
import { useCurrentToken } from "../store/app/features/auth/authSlice";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  if (token) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default PublicRoute;
