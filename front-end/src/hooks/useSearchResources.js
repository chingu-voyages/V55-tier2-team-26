import { useEffect, useRef, useState } from "react";
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

  // const highlightActiveTags = (id) => {
  //   activeTags.includes(id) ? "bg-yellow-400" : "bg-grey-400";
  // }

  const handleTagsInput = (e) => {
    const tagId = e.target.id;
    const tagName = e.target.textContent;

    if (activeTags.findIndex((activeTag) => activeTag.id === tagId) !== -1) { //finding if the tag is already in the activeTag list
      const filteredTags = activeTags.filter(({ id }) => id !== tagId); //if it is found in the active list, removes it
      //add a line here to remove highlight effect from selected tag
      searchInputRef.current.focus(); 
      return setActiveTags(filteredTags);
    }
    searchInputRef.current.focus(); 
    setActiveTags((oldState) => [...oldState, { id: tagId, name: tagName }]); //if the tag is not found in the activetags list, add it
    // console.table(activeTags);
    // highlightActiveTags();
  };

  const clearAllTags = () => {
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
    clearAllTags,
  };
}
