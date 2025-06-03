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

  const showAboutModal = location.pathname === "/about";

  const handleOnCloseModal = () => {
    navigate("/");
    modalRef.current.close()
  };

  useEffect(() => {
    if (showAboutModal) {
      modalRef.current.showModal();
    }
  }, [showAboutModal]);

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
