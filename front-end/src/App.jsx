import { useRef } from "react";
import { Outlet } from "react-router";
import AboutPageModal from "./components/AboutUs/AboutPageModal";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import Footer from "./components/Footer";
import AIChatBot from "./components/AIChatBot/AIChatBot";

export default function App() {
  const modalRef = useRef();

  const handleOpenModal = () => {
    modalRef.current.showModal();
    modalRef.current.scrollTop = 0;
  };

  const handleCloseModal = () => {
    modalRef.current.close();
  };

  return (
    <>
      <AboutPageModal ref={modalRef} handleCloseModal={handleCloseModal} />
      <Header className={"max-sm:h-[6svh] sm:h-[6svh] md:h-[7svh]"} />
      <MainContainer
        className={
          "overflow-hidden max-[380px]:h-[85svh] min-[390px]:h-[85svh] sm:h-[85svh] md:h-[84svh]"
        }
      >
        <Outlet />
        <AIChatBot />
      </MainContainer>
      <Footer
        handleOpenModal={handleOpenModal}
        className={"h-[9svh] xl:h-80"}
      />
    </>
  );
}
