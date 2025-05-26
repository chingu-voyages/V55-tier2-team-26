import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./App";
import ResultsPagination from "./components/ResultsComponent/ResultsPagination";

export default function Router({ children }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" index element={<Navigate to="/search?page=1" replace/>}/>
        <Route path="search">
            <Route index element={<App/>}/>
            <Route path=":page" element={<ResultsPagination/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
