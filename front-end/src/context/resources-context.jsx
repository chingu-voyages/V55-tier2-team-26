import { createContext, useEffect, useState } from "react";
import {
  fetchResources,
  fetchTags,
} from "../../../front-end/src/utils/resource-api-utils";
import useSearchResources from "../../../front-end/src/hooks/useSearchResources";

export const ResourcesContext = createContext({
  tags: [],
  resources: [],
  activeTags: [],
  results: [],
  isFetching: {},
  error: null,
  searchInputRef: {},
  searchOnPageload: () => {},
  handleUserInput: () => {},
  handleTagsInput: () => {},
  clearAllTags: () => {},
});

export default function ResourceContextProvider({ children }) {
  const [tags, setTags] = useState(null);
  const [resources, setResources] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState({
    resources: true,
    tags: true,
  });

  const [activeTags, setActiveTags] = useState([]);

  const {
    results,
    searchInputRef,
    searchOnPageload,
    handleUserInput,
    handleTagsInput,
    clearAllTags,
  } = useSearchResources({ resources, tags, isFetching });

  const ctxValue = {
    tags,
    resources,
    isFetching,
    error,
    activeTags,
    setActiveTags,
    results,
    searchInputRef,
    searchOnPageload,
    handleUserInput,
    handleTagsInput,
    clearAllTags,
  };

  useEffect(() => {
    async function fetchAPI() {
      setIsFetching({ resources: true, tags: true });
      setError(null);

      try {
        const fetchedTags = await fetchTags();
        setTags(fetchedTags);
        setIsFetching(() => ({ resources: true, tags: false }));

        const fetchedResources = await fetchResources();
        setResources(fetchedResources);
        setIsFetching(() => ({ resources: false, tags: false }));
      } catch (error) {
        setError({
          type: "API_UNAVAILABLE",
          message:
            "Unable to connect to the server. Please check your connection and try again.",
          originalError: error,
        });
        setIsFetching(() => ({ resources: false, tags: false }));
      }
    }

    fetchAPI();
  }, []);

  return (
    <ResourcesContext.Provider value={ctxValue}>
      {children}
    </ResourcesContext.Provider>
  );
}
