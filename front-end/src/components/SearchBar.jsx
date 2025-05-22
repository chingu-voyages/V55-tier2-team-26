import { useContext, useState } from "react";
import { ResourcesContext } from "../context/resources-context";
import { FaExclamationCircle } from "react-icons/fa";

export default function SearchBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [errors, setErrors] = useState({ searchText: "" });

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
      filteredTags = tags.filter(({tag: originalTagName, id}) =>
        ({tag: originalTagName.toLowerCase().includes(filter.toLowerCase()), id})
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

    if (text.trim().length > 250) {
      setErrors(prev => ({
        ...prev,
        searchText: "Please shorten your search terms to 250 characters or less.",
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
        <div className="flex items-center">
          <form className="w-full flex" onSubmit={handleSubmit}>
            <div className="relative w-full max-w-md rounded-[20px] h-[50px] outline-[1px] flex">
              {errors.searchText && (
                <div 
                  id="search-error-message" 
                  role="alert" 
                  className="absolute top-[-35px] left-0 text-red-500 text-base font-medium flex items-center gap-[6px] whitespace-nowrap"
                >
                  <FaExclamationCircle aria-hidden="true" /> 
                  {errors.searchText}
                </div>
              )}
              <button
                type="submit"
                className="absolute left-0 top-0 h-full w-10 rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center cursor-pointer focus:bg-orange-500 bg-blue-500 text-pink-500 text-lg border border-gray-400 border-l-0 hover:bg-orange-500"
              >
                <i className="fa fa-search"></i>
              </button>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                onChange={handleUserInput}
                aria-label="Search resources"
                aria-invalid={!!errors.searchText}
                aria-describedby={errors.searchText ? "search-error-message" : undefined}
                className={`w-full p-2 pl-12 text-lg rounded-[20px] border ${errors.searchText ? "border-red-500" : "border-gray-400"} bg-green-500 text-white focus:outline-none`}
              />
            </div>
          </form>
        </div>
      </div>

      <div id="tagsDropdownContainer">
        <div className="dropdown">
          <button
            className="w-full h-[50px] outline-[1px] rounded-[20px] focus:bg-amber-800 hover:bg-amber-800 bg-amber-400 text-[purple] p-[16px] text-[16px] cursor-pointer"
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            Dropdown
          </button>
          {dropdownOpen && (
            <div
              id="myDropdown"
              className="absolute w-full p-2 flex flex-col bg-[#f6f6f6]"
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
                  className="block w-full p-2 hover:bg-gray-200 rounded-md text-gray-700"
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
          className="h-[50px] w-full rounded-[20px] cursor-pointer focus:bg-amber-700 hover:bg-amber-700 bg-amber-900 text-yellow-400"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
