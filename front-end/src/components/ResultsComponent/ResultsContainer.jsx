import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ResultsPagination from "./ResultsPagination";
import Results from "./Results";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import { ResourcesContext } from "../../context/resources-context";

export default function ResultsContainer() {
  let [searchParams] = useSearchParams();
  const { results, error } = useContext(ResourcesContext);

  const [activePage, setActivePage] = useState(() => {
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    return pageFromUrl;
  });

  const handlePagination = (newCurrentPage) => {
    setActivePage(newCurrentPage);
  };

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    setActivePage(pageFromUrl);
  }, [searchParams]);

  if (error) {
    return (
      <section>
        <div className="w-svw p-4 text-center">
          <div 
          className="bg-red-100 border border-red-400 text-red-700 px-y py-3 rounded"
          role="alert"
          >
            <h3 
              className="font-semibold mb-2"
              id="error-title"
            >
              Connection Error
            </h3>
            <p 
              className=""
              id="error-message"
            >
              {error.message}
            </p>
            <button
              className="mt-3 bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded"
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
        {!results ? (
          <LoadingIndicator />
        ) : results.error ? (
          <div className="w-full p-4 text-center">
            <div
              className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
              role="alert"
              aria-live="polite"
              aria-atomic="true"
            >
              <h3 className="font-semibold mb-2">No Results Found</h3>
              <p>{results.error}</p>
            </div>
          </div>
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
