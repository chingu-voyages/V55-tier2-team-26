import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./App";
import ResultsPagination from "./components/ResultsComponent/ResultsPagination";
import LandingPageLayout from "./components/LandingPageLayout";
import ResultsPageLayout from "./components/ResultsPageLayout";

export default function Router({ children }) {
  return (
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
  );
}
