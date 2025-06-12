import ResourceContextProvider from "../context/resources-context";

export default function MainContainer({ children, className }) {
  return (
    <ResourceContextProvider>
      <main className={className}>{children}</main>
    </ResourceContextProvider>
  );
}
