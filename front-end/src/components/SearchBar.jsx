import { useContext, useState } from "react";
import { ResourcesContext } from "../context/resources-context";

export default function SearchBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [errors, setErrors] = useState({ searchText: "" });

  const highlightActiveTags = (id) => 
    activeTags.some(tag => tag.id === id) ? "bg-[#6D597A] text-white" : "bg-[#f6f6f6] text-black";

  let filteredTags = [];
  const { 
    tags, 
    results, 
    searchInputRef, 
    activeTags, 
    handleUserInput: baseHandleUserInput, 
    handleTagsInput: baseHandleTagsInput,
    clearAllTags,
  } = useContext(ResourcesContext);

  if (tags !== null) {
      filteredTags = tags.filter(({tag: originalTagName}) =>
        originalTagName.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const handleUserInput = (e) => {
    if (validateSearchText(e.target.value)) {
      baseHandleUserInput(e);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentSearchText = searchInputRef.current.value;
    const tagIds = activeTags.map(tag => tag.id);

    const isSearchTextValid = validateSearchText(currentSearchText);

    if (!isSearchTextValid) {
      return;
    }

    const searchData = {
      keywords: currentSearchText,
      tags: tagIds,
    };

    console.log("Search data:", searchData);
    console.log("Search results:", results);
  };

  const handleClear = () => {
    searchInputRef.current.value = "";
    baseHandleUserInput({
      target: {
        value: "",
      },
    });

    clearAllTags();
    setErrors({ searchText: "" });
  }

  const validateSearchText = (text) => {
    setErrors(prev => ({...prev, searchText: ""}));

    if (!text || text.trim() === "") {
      return true;
    }

    if (text.trim().length > 100) {
      setErrors(prev => ({
        ...prev,
        searchText: "Search text cannot exceed 100 characters.",
      }));
      return false;
    }
    
    return true;
  };

  return (
    <div
      id="searchFormContainer"
      className="w-[80%] m-auto mt-20 mb-20 flex gap-[10px] items-center justify-center"
    >
      <div id="searchBarContainer">
        <div className="flex items-center ">
          <form className="w-full flex" onSubmit={handleSubmit}>
            <div className="relative w-full max-w-md rounded-[20px] h-[50px] outline-[1px] flex">
              <button
                type="submit"
                className="absolute left-0 top-0 h-full w-10 rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center cursor-pointer focus:text-lg bg-[#2E4057] text-white text-md border border-gray-400 border-l-0 hover:text-lg"
              >
                <i className="fa fa-search"></i>
              </button>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                onChange={handleUserInput}
                className={`w-full p-2 pl-12 text-lg rounded-[20px] border ${errors.searchText ? "border-red-500" : "border-gray-400"} bg-gray-200 text-black focus:outline-none`}
              />
            </div>
            {errors.searchText && (
              <div className="absolute mt-[52px] text-red-500 text-sm">
                {errors.searchText}
              </div>
            )}
          </form>
        </div>
      </div>

      <div id="tagsDropdownContainer">
        <div className="dropdown">
          <button
            className="w-full h-[50px] outline-[1px] rounded-[20px] bg-[#2E4057] text-white p-[16px] text-[16px] cursor-pointer hover:font-bold focus:font-bold"
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            Tags
          </button>
          {dropdownOpen && (
            <div
              id="myDropdown"
              className="absolute w-[175px] p-2 flex flex-col bg-[#f6f6f6]"
            >
              <input
                type="text"
                placeholder="Tag..."
                id="myInput"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              {filteredTags.length === 0 ? null : filteredTags.map(({ tag, id }) => {
                return (<a
                  id={id}
                  href={`#${tag.toLowerCase()}`}
                  key={tag}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Selected tag ID:", id);
                    baseHandleTagsInput({
                      target: {
                        value: id,
                        textContent: tag,
                      }
                    });
                  }}
                  className={`block w-full p-1 m-[.5px] hover:font-bold rounded-md text-gray-700 ${highlightActiveTags(id)}`}
                >
                  {tag}
                </a>)
              })}
            </div>
          )}
        </div>
      </div>

      <div id="clearButton" className="w-[10%]">
        <button 
          onClick={handleClear}
          className="h-[50px] w-full rounded-[20px] cursor-pointer focus:font-bold hover:font-bold bg-[#A9DEF9] text-black"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
