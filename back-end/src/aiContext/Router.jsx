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

function Router() {
  return <RouterProvider router={router} />;
}