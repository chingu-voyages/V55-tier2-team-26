import { useEffect, useRef, useState } from "react";
import { searchBy } from "../utils/resource-api-utils";
import { useSearchParams } from "react-router";

export default function useSearchResources({ resources, tags, isFetching }) {
  const timerRef = useRef();
  const searchInputRef = useRef();
  const [searchParams] = useSearchParams();
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
    setActiveTags([]);
    searchInputRef.current.focus();
  };

  const searchOnPageload = (keywords) => {
    const refactoredTags = activeTags.map(({ id }) => id);
    setUserInput({ keywords, tags: refactoredTags })
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
      keywords: searchInputRef.current.value,
      tags: refactoredTags,
    });
  }, [activeTags]);

  useEffect(() => {
    // Set search input value to match URL
    searchInputRef.current.value = queryValue.keywords;

    // If there are tags in the URL, find their full info from the tags list
    if (queryValue.tags.length > 0 && tags) {
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
    if (!isFetching.resources && !isFetching.tags) {
      if (queryValue === null)
        return setResults(() =>
          searchBy({ data: resources, keywords: "", tags: [] })
        );

      const { keywords, tags } = queryValue;
      return setResults(() => searchBy({ data: resources, keywords, tags }));
    }
  }, [queryValue, isFetching]);

  return {
    results,
    activeTags,
    searchInputRef,
    searchOnPageload,
    handleUserInput,
    handleTagsInput,
    clearAllTags,
  };
}
