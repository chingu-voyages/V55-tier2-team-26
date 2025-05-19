import DemoComponent from "./components/DemoComponent/DemoComponent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";

export default function App() {
  return (
    <>
      <Header />
      <MainContainer>
        <DemoComponent />
      </MainContainer>
      <Footer />
    </>
  );
}
