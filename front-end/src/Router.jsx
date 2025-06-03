import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import App from "./App";
import ResultsPagination from "./components/ResultsComponent/ResultsPagination";
import LandingPageLayout from "./components/LandingPageLayout";
import ResultsPageLayout from "./components/ResultsPageLayout";
import AboutUs from "./components/AboutUs/AboutPageModal";

const router = createBrowserRouter([
  { path: "about/*", element: <Navigate to="/about" replace /> },
  { path: "search", element: <Navigate to="/search" replace /> },
  { path: "*", element: <Navigate to="/" replace /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPageLayout /> },
      {
        path: "search",
        children: [
          { index: true, element: <ResultsPageLayout /> },
          { path: ":page", element: <ResultsPagination /> },
        ],
      },
      {
        path: "about",
        children: [
          { index: true, element: <AboutUs /> },
          {
            path: "search",
            children: [
              { index: true, element: <ResultsPageLayout /> },
              { path: ":page", element: <ResultsPagination /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
