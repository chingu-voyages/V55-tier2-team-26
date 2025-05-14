import DemoComponent from "./components/DemoComponent/DemoComponent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import TestInputField from "./components/TestInputField";

export default function App() {
  return <>
  <Footer/>
    <MainContainer>
      <TestInputField/>
      <DemoComponent/>
    </MainContainer>
  <Header/>
  </>;
}
