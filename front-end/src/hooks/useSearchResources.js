import { useEffect, useRef, useState } from "react";
import { searchBy } from "../utils/resource-api-utils";

export default function useSearchResources({ resources, isFetching }) {
  const timerRef = useRef();
  const [userInput, setUserInput] = useState(null);
  const [activeTags, setActiveTags] = useState([]);
  const [queryValue, setQueryValue] = useState(null);
  const [results, setResults] = useState(null);

  const handleUserInput = (e) => {
    console.log(e);
    setUserInput({ keywords: e.target.value, tags: activeTags });
  };

  const handleTagsInput = (e) => {
    console.log(activeTags, e.target.value)
    setActiveTags((oldState)=>([...oldState, e.target.value]))

  };

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setQueryValue(userInput);
    }, 1500);
  }, [userInput]);

  useEffect(() => {
    if (!isFetching.resources && !isFetching.tags) {
      const { keywords, tags } = queryValue;
      setResults(() => {
        console.log(searchBy({ data: resources, keywords, tags }));
        return searchBy({ data: resources, keywords, tags });
      });
    }
  }, [queryValue, activeTags]);

  return { results, activeTags, handleUserInput, handleTagsInput };
}
