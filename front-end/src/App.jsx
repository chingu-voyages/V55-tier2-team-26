import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import ResultsContainer from "./components/ResultsComponent/ResultsContainer";

export default function App() {
  return (
    <>
      <Header />
      <MainContainer>
        <SearchBar />
        <ResultsContainer />
      </MainContainer>
      <Footer />
    </>
  );
}
