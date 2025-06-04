import ResourceContextProvider from "../context/resources-context";
import { useLocation } from "react-router";

export default function MainContainer({ children }) {
  const location = useLocation();
  const showAbout = location.pathname === "/about" || location.pathname === "/about/search";

  if (showAbout) return null;

  return (
    <ResourceContextProvider>
      <main>{children}</main>
    </ResourceContextProvider>
  );
}
