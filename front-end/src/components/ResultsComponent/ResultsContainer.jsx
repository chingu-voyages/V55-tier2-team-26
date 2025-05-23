import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import ResultsPagination from "./ResultsPagination";
import Results from "./Results";

import { ResourcesContext } from "../../context/resources-context";

export default function ResultsContainer() {
  let [searchParams] = useSearchParams();
  //searchParams.get("page") //This get the urlParam for the page

  const { results, tags, error } = useContext(ResourcesContext);

  const [activePage, setActivePage] = useState(1);

  const handlePagination = (newCurrentPage) => {
    setActivePage(newCurrentPage);
  };

  useEffect(() => {
    setActivePage(1)
  }, [results])

  if (error) {
    return (
      <section>
        <div className="w-svw p-4">
          <div 
          className="bg-red-100 border border-red-400 text-red-700 px-y py-3 rounded"
          role="alert"
          >
            <h3 
              className="font-bold mb-2 ml-2"
              id="error-title"
            >
              Connection Error
            </h3>
            <p 
              className="ml-2"
              id="error-message"
            >
              {error.message}
            </p>
            <button
              className="mt-3 ml-2 bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded"
              onClick={() => window.location.reload()}
              aria-describedby="error-title error-message"
              aria-label="Retry loading the page to resolve connection error"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="w-svw">
        {!results ? <p>Loading resources...</p> : (
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
