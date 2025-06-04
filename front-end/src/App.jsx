import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useRef } from "react";

import AboutPageModal from "./components/AboutUs/AboutPageModal";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import Footer from "./components/Footer";
import AIChatBot from "./components/AIChatBot/AIChatBot";

export default function App() {
  const modalRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const showAboutModal =
    location.pathname === "/about" || location.pathname === "/about/search";

  const handleOnCloseModal = () => {
    location.pathname === "/about" ? navigate("/") : navigate("/search");
    modalRef.current.close()
  };

  const handleOnOpenModal = () => { //you can add this function to any button to open the about us page
    location.pathname === "/" ? navigate("/about") : navigate("/about/search");
    modalRef.current.showModal();
  };

  useEffect(() => {
    showAboutModal ? modalRef.current.showModal() : null;
  }, []);

  return (
    <>
      <AboutPageModal ref={modalRef} handleOnCloseModal={handleOnCloseModal} />
      <Header />
      <MainContainer>
        <Outlet />
        <AIChatBot />
      </MainContainer>
      <Footer />
    </>
  );
}
