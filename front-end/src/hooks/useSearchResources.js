import { act, useEffect, useRef, useState } from "react";
import { searchBy } from "../utils/resource-api-utils";

export default function useSearchResources({ resources, isFetching }) {
  const timerRef = useRef();
  const searchInputRef = useRef();

  const [queryValue, setQueryValue] = useState({ keywords: "", tags: [] });
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
    handleUserInput,
    handleTagsInput,
  };
}
