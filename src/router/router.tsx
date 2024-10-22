import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/SignIn";
import PublicRoute from "./PublicRoute";
import HomePage from "../pages/dashboard/HomePage";
import { sidebarItems } from "../components/layouts/sidebarItems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: sidebarItems?.map((item) => ({
      path: item?.to,
      element: item?.element
    }))
  },
  {
    path: "/sign-in",
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    )
  },
  {
    path: "*",
    element: <Navigate to="/" replace={true} />
  }
]);

export default router;
