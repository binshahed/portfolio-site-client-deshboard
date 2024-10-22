import React from "react";
import HomePage from "../../pages/dashboard/HomePage";
import ProjectsPage from "../../pages/dashboard/ProjectsPage";
import SkillPage from "../../pages/dashboard/SkillPage";
import ExperiencePage from "../../pages/dashboard/ExperiencePage";
import BlogPage from "../../pages/dashboard/BlogPage";
import EducationPage from "../../pages/dashboard/EducationPage";

export const sidebarItems = [
  {
    title: "Dashboard",
    to: "/",
    element: <HomePage />
  },
  {
    title: "Projects",
    to: "projects",
    element: <ProjectsPage />
  },
  {
    title: "Skills",
    to: "skills",
    element: <SkillPage />
  },
  {
    title: "Experience",
    to: "experience",
    element: <ExperiencePage />
  },
  {
    title: "Blog",
    to: "blog",
    element: <BlogPage />
  },
  {
    title: "Education",
    to: "education",
    element: <EducationPage />
  }
];
