import { Outlet } from "react-router";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import Footer from "./components/Footer";
import AIChatBot from "./components/AIChatBot/AIChatBot";

export default function App() {
  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
        <AIChatBot />
      </MainContainer>
      <Footer />
    </>
  );
}
