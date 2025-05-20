import { use, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import ResultsPagination from "./ResultsPagination";
import Results from "./Results";

import { ResourcesContext } from "../../context/resources-context";

export default function ResultsContainer() {
  let [searchParams] = useSearchParams();
  //searchParams.get("page") //This get the urlParam for the page

  const { results } = useContext(ResourcesContext);

  console.log(results)

  const [activePage, setActivePage] = useState(1);

  const handlePagination = (newCurrentPage) => {
    setActivePage(newCurrentPage);
  };

  useEffect(()=>{
    setActivePage(1)
  },[results])

  return (
    <section>
      <div className="w-svw">
        {!results ? <p>Loading resources...</p> : (
          <>
            <Results results={results} activePage={activePage} />
            <ResultsPagination
              activePage={activePage}
              onClick={handlePagination}
            />
          </>
        )}
      </div>
    </section>
  );
}
