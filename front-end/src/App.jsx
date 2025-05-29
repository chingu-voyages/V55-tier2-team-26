import { Outlet } from "react-router";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import Footer from "./components/Footer";

import { sendChatResponse } from "./utils/gemini-api-utils";

export default function App() {

  sendChatResponse('test','hello').then(res=>console.log(res))

  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </>
  );
}
