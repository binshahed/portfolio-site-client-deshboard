import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/SignIn";
import PublicRoute from "./PublicRoute";
import HomePage from "../pages/dashboard/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/about",
        element: <div>About Page</div>
      },
      {
        path: "/contact",
        element: <div>Contact Page</div>
      }
    ]
  },
  {
    path: "/sign-in",
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    )
  }
]);

export default router;
