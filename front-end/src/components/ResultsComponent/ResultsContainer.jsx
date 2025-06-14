import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { ResourcesContext } from "../../context/resources-context";

import ResultsPagination from "./ResultsPagination";
import Results from "./Results";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

export default function ResultsContainer({className}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { results, error } = useContext(ResourcesContext);

  // Get page state from URL on mount
  const [activePage, setActivePage] = useState(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) : 1;
  });

  const handlePagination = (newCurrentPage) => {
    setActivePage(newCurrentPage);

    // Keep URL in sync with user interactions while preserving search params
    const params = new URLSearchParams(searchParams);
    params.set("page", newCurrentPage);
    setSearchParams(params);
  };

  // Read URL changes and update state
  useEffect(() => {
    const page = searchParams.get("page");
    setActivePage(page ? parseInt(page) : 1);
  }, [searchParams]);

  // Reset pagination on search changes
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams);
    const keywords = currentParams.get("keywords");
    const tags = currentParams.get("tags");

    if ((keywords || tags) && searchParams.get("page") !== "1") {
      currentParams.delete("page");
      setSearchParams(currentParams);
    }

  }, [searchParams.get("keywords"), searchParams.get("tags")]);

  if (error) {
    return (
      <section className={className}>
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
    <section className={className}>
      <div className="flex flex-col w-svw max-[380px]:h-[65svh] min-[390px]:h-[70svh] md:h-[74svh] xl:h-[70svh]">
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
            <Results results={results} activePage={activePage}/>
            <ResultsPagination className={"pt-5 max-md:pb-3 md:pb-11"}
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
