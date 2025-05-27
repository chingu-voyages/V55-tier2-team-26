import { use, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import ResultsPagination from "./ResultsPagination";
import Results from "./Results";
import ResourceItem from "./ResourceItem";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { ResourcesContext } from "../../context/resources-context";

export default function ResultsContainer() {
  let [searchParams] = useSearchParams();
  //searchParams.get("page") //This get the urlParam for the page

  const { results, tags } = useContext(ResourcesContext);

  const [activePage, setActivePage] = useState(1);

  const handlePagination = (newCurrentPage) => {
    setActivePage(newCurrentPage);
  };

  useEffect(() => {
    setActivePage(1);
  }, [results]);

  return (
    <section>
      <div className="w-svw">
        {!results ? (
          <LoadingIndicator />
        ) : (
          <>
            <Results results={results} activePage={activePage} />
            <ResultsPagination
              totalResults={results.length}
              activePage={activePage}
              onClick={handlePagination}
            />
          </>
        )}
      </div>
    </section>
  );
}
