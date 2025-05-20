import { useContext, useState } from "react";
import { useSearchParams } from "react-router";

import ResultsPagination from "./ResultsPagination";
import Results from "./Results";

import { ResourcesContext } from "../../context/resources-context";

export default function ResultsContainer() {
  let [searchParams] = useSearchParams();
  //searchParams.get("page") //This get the urlParam for the page
  const { results } = useContext(ResourcesContext);

  const [activePage, setActivePage] = useState(1);

  const handlePagination = (newCurrentPage) => {
    setActivePage(newCurrentPage);
  };

  return (
    <section>
      <div>
        <Results results={results} />
        <ResultsPagination activePage={activePage} onClick={handlePagination} />
      </div>
    </section>
  );
}
