import { useEffect, useRef, useState } from "react";
import { searchBy } from "../utils/resource-api-utils";
import { useSearchParams, useLocation } from "react-router";

export default function useSearchResources({ resources, tags, isFetching }) {
  const timerRef = useRef();
  const searchInputRef = useRef();
  const urlUpdateTimer = useRef();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryValue, setQueryValue] = useState({ 
    keywords: searchParams.get("keywords") || "", 
    tags: searchParams.get("tags") ? searchParams.get("tags").split(",") : []
  });
  const [activeTags, setActiveTags] = useState([]);
  const [userInput, setUserInput] = useState(null);
  const [results, setResults] = useState(null);

  const handleUserInput = (e) => {
    const refactoredTags = activeTags.map(({ id }) => id);
    setUserInput({ keywords: e.target.value, tags: refactoredTags });
  };

  const handleTagsInput = (e) => {
    const tagId = e.target.value;
    const tagName = e.target.textContent;

    if (activeTags.findIndex((activeTag) => activeTag.id === tagId) !== -1) {
      const filteredTags = activeTags.filter(({ id }) => id !== tagId);
      searchInputRef.current.focus();
      return setActiveTags(filteredTags);
    }
    searchInputRef.current.focus();
    setActiveTags((oldState) => [...oldState, { id: tagId, name: tagName }]);
  };

  const clearAllTags = () => {
    console.log("ActiveTags before clearing: ", activeTags);
    setActiveTags([]);
    searchInputRef.current.focus();
  };

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setQueryValue(userInput);
    }, 1000);
  }, [userInput]);

  useEffect(() => {
    const refactoredTags = activeTags.map(({ id }) => id);
    setQueryValue({
      keywords: queryValue.keywords, // Use state instead of DOM ref
      tags: refactoredTags,
    });
  }, [activeTags, queryValue.keywords]); // Add dependency

  useEffect(() => {
    // When URL params change, update queryValue to match new URL pararms
    setQueryValue({
      keywords: searchParams.get("keywords") || "",
      tags: searchParams.get("tags") ? searchParams.get("tags").split(",") : []
    });
  }, [searchParams]); // Only run this effect when searchParams changes

  useEffect(() => {
    // Set search input value to match URL
    searchInputRef.current.value = queryValue.keywords;

    // Only set activeTags from URL on initial load or direct URL navigation
    if (queryValue.tags.length > 0 && tags && !activeTags.length) {
      const initialActiveTags = queryValue.tags
        .map((tagId) => {
          const foundTag = tags.find((t) => t.id === tagId);
          return foundTag ? { id: foundTag.id, name: foundTag.tag } : null;
        })
        .filter((tag) => tag !== null); // Remove any tags that weren't found
      
      setActiveTags(initialActiveTags);
    }

    // Set user input to match URL
    setUserInput({
      keywords: queryValue.keywords,
      tags: queryValue.tags
    });
  }, [searchParams, tags, queryValue]); // Run this effect with URL params, tags, or queryValue changes

  useEffect(() => {
    // Only update URL on search page
    if (location.pathname === "/search") {
      // Clear pending URL updates
      clearTimeout(urlUpdateTimer.current);

      // Debounce the URL update
      urlUpdateTimer.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams);

        // Sync URL with current search state, clean up empty/unwanted params
        if (queryValue.keywords) {
          params.set("keywords", queryValue.keywords);
        } else {
          params.delete("keywords");
        }
        
        if (queryValue.tags.length > 0) {
          params.set("tags", queryValue.tags.join(","));
        } else {
          params.delete("tags");
        }

        // Only update URL if keywords/tags changed
        const currentKeywords = searchParams.get("keywords") || "";
        const currentTags = searchParams.get("tags") || "";
        const newTags = queryValue.tags.join(",");

        if (currentKeywords !== queryValue.keywords || currentTags !== newTags) {
          setSearchParams(params);
        } 
      }, 1000); // Same debounce as search
    }
  }, [queryValue.keywords, queryValue.tags, location.pathname]); // Run when queryValue or location changes

  useEffect(() => {
    if (!isFetching.resources && !isFetching.tags) {
      if (queryValue === null) {
        return setResults(() =>
          searchBy({ data: resources, keywords: "", tags: [] })
        );
      }

      const { keywords, tags } = queryValue;
      return setResults(() => searchBy({ data: resources, keywords, tags }));
    }
  }, [queryValue, isFetching]);

  return {
    results,
    activeTags,
    searchInputRef,
    handleUserInput,
    handleTagsInput,
    clearAllTags,
  };
}
