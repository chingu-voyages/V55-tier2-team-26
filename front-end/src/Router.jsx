import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import App from "./App";
import ResultsPagination from "./components/ResultsComponent/ResultsPagination";
import LandingPageLayout from "./components/LandingPageLayout";
import ResultsPageLayout from "./components/ResultsPageLayout";

const router = createBrowserRouter([
  {path:"search", element:<Navigate to="/search" replace />},
  {path:"*", element:<Navigate to="/" replace />},
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
    ],
  },
]);

export default function Router({ children }) {
  return <RouterProvider router={router} />;
}

/*
    <BrowserRouter>
      <Routes>
        <Route path="search" element={<Navigate to="/search" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<App />}>
          <Route index element={<LandingPageLayout />} />
          <Route path="search">
            <Route index element={<ResultsPageLayout />} />
            <Route path=":page" element={<ResultsPagination />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
*/
