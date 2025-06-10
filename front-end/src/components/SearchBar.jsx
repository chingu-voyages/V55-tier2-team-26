import { Form, useSearchParams, useNavigate, useLocation } from "react-router";
import { useContext, useState, useEffect } from "react";
import { ResourcesContext } from "../context/resources-context";
import { FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

import "./SearchBarStyles.css";

export default function SearchBar() {
  const [, setSearchParams] = useSearchParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [errors, setErrors] = useState({ searchText: "" });
  const [info, setInfo] = useState({ tags: "" });
  const [showTagPills, setShowTagPills] = useState(false);
  const [inputValue, setInputValue] = useState("");
  //const queryParams = searchParams.get("keywords");
  const navigate = useNavigate();
  const location = useLocation();


  const {
    tags,
    searchInputRef,
    activeTags,
    setActiveTags,
    //searchOnPageload,
    handleUserInput: baseHandleUserInput,
    handleTagsInput: baseHandleTagsInput,
    clearAllTags,
  } = useContext(ResourcesContext);

  const tagStyles = {
    activeTag: "bg-[#998675] text-black",
    inactiveTag: "bg-[#f6f6f6] text-black",
  };

  useEffect(() => {
    function handleClickOutsideForm(event) {
      const searchArea = document.getElementById(
        "theActualSearchBarWithDropdownOpen"
      );
      const tagsContainer = document.getElementById("dropdownTagsContainer");
      if (
        // searchInput &&
        // tagsContainer &&
        !searchArea.contains(event.target)
        // !tagsContainer.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutsideForm);
    }

    return () => {
      document.removeEventListener("click", handleClickOutsideForm);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    setShowTagPills(activeTags.length > 0);
  }, [activeTags]);

  useEffect(() => {
    validateTags(activeTags);
  }, [activeTags]);

  let filteredTags = [];
  if (tags !== null) {
    filteredTags = tags.filter(({ tag }) =>
      tag.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const highlightActiveTags = (id) =>
    activeTags.some((tag) => tag.id === id)
      ? tagStyles.activeTag
      : tagStyles.inactiveTag;

  const handleUserInput = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (validateSearchText(newValue)) {
      baseHandleUserInput(e);
    }
  };

  const handleTagsInput = (e) => {
    const tagId = e.target.value;
    const tagName = e.target.textContent;

    setActiveTags((prevTags) => {
      if (prevTags.some((tag) => tag.id === tagId)) {
        return prevTags.filter((tag) => tag.id !== tagId);
      }

      if (activeTags.length < 8) {
        return [...prevTags, { id: tagId, name: tagName }];
      }

      return prevTags;
    });
    baseHandleTagsInput(e);
  };

  const removeTag = (id) => {
    const updatedTags = activeTags.filter((tag) => tag.id !== id);
    setActiveTags(updatedTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentSearchText = searchInputRef.current.value;
    const tagIds = activeTags.map((tag) => tag.id);

    const isSearchTextValid = validateSearchText(currentSearchText);
    const isTagsValid = activeTags.length <= 8;

    if (!isSearchTextValid || !isTagsValid) {
      return;
    }

    // Update URL with both keywords and tags
    const searchParams = new URLSearchParams();
    if (currentSearchText) searchParams.set("keywords", currentSearchText);
    if (tagIds.length > 0) searchParams.set("tags", tagIds.join(","));

    // Navigate to search page with params
    navigate(`/search?${searchParams.toString()}`);
  };

  const handleReset = () => {
    searchInputRef.current.value = "";
    baseHandleUserInput({
      target: {
        value: "",
      },
    });

    clearAllTags();
    setErrors({ searchText: "", tags: "" });

    // Clears URL params if on the search page
    if (location.pathname === "/search") {
      setSearchParams({});
    }
  };

  const handleClearTags = () => {
    clearAllTags();
    setErrors({ tags: "" });
  };

  const validateSearchText = (text) => {
    setErrors((prev) => ({ ...prev, searchText: "" }));

    if (!text || text.trim() === "") {
      return true;
    }

    if (text.trim().length > 250) {
      setErrors((prev) => ({
        ...prev,
        searchText:
          "Please shorten your search terms to 250 characters or less.",
      }));
      return false;
    }

    return true;
  };

  const validateTags = (currentTags) => {
    if (currentTags.length === 8) {
      setInfo((prev) => ({
        ...prev,
        tags: "8 tags selected. Remove a tag to select others.",
      }));
      return true;
    }

    setInfo((prev) => ({ ...prev, tags: "" }));
    return true;
  };

  useEffect(() => {
    if (dropdownOpen) searchInputRef.current.focus();
  }, [dropdownOpen]);

  // useEffect(() => {
  //   if (queryParams !== searchInputRef.current.value) {
  //     searchInputRef.current.value = queryParams;
  //     searchOnPageload(queryParams);
  //   }
  // }, []);

  useEffect(() => {
    console.log("activeTags updated: ", activeTags);
  }, [activeTags]);

  return (
    <div
      id="searchFormContainer"
      className="w-[90%] h-[260px] m-auto mt-4 mb-20 flex flex-col gap-[15px] items-center justify-between rounded-[20px]"
    >
      <div
        id="searchBarContainer"
        className="w-full flex flex-col items-center justify-center"
      >
        <div className="flex items-center relative min-w-[350px]">
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
          {info.tags && (
            <div
              id="tags-info-message"
              className={`absolute top-[-18px] left-3 text-[.7rem] font-medium flex items-center gap-[6px] whitespace-nowrap ${
                activeTags.length === 8 && "text-[#2E4057]"
              }`}
            >
              <FaInfoCircle aria-hidden="true" />
              {info.tags}
            </div>
          )}

          <Form
            className="w-full flex"
            onSubmit={handleSubmit}
          >
            {!dropdownOpen && (
              <div
                id="theActualSearchBar"
                className={`relative w-full max-w-md rounded-[20px] h-[40px] border-1 border-[#939AAA] flex`}
              >
                <i className="fa fa-search absolute top-1/2 transform -translate-y-1/2 left-3" />
                <input
                  name="keywords"
                  ref={searchInputRef}
                  type="text"
                  placeholder="What are you looking for?"
                  value={inputValue}
                  onChange={handleUserInput}
                  aria-label="Search resources"
                  aria-invalid={!!errors.searchText}
                  aria-describedby={
                    errors.searchText ? "search-error-message" : undefined
                  }
                  className={`placeholder:italic w-full p-2 pl-10 pr-10 text-md rounded-[20px] bg-white text-black focus:outline-none ${
                    errors.searchText
                      ? "border-2 border-red-500 border-r-0"
                      : "border border-[#F9F5FF] border-l-0"
                  }`}
                  onFocus={() => setDropdownOpen((open) => true)}
                  // aria-describedby={info.tags ? "tags-info-message" : undefined}
                  // aria-label="Select tags to filter results"
                />
                <button
                  type="button" 
                  onClick={() => {
                    // searchInputRef.current.value = "";
                    setInputValue("");
                    handleUserInput({ target: { value: "" } });
                    handleClearTags();
                  }}
                  //onClick={handleReset}
                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-[120%]"
                  aria-label="Reset search"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
                {/* {showTagPills && (
                  <div
                    id="tagPillsContainer"
                    className="absolute bottom-[-60px] left-0 max-w-[60%] w-full flex border-amber-950 border-1 w-[50px] h-[50px]"
                  ></div>
                )} */}
              </div>
            )}
            {dropdownOpen && (
              <div
                id="theActualSearchBarWithDropdownOpen"
                className="relative w-full max-w-md rounded-[20px] flex flex-col bg-white border-1 border-[#939AAA]"
              >
                <div
                  id="searchAndClearIconsContainer"
                  className="relative w-full flex items-center"
                >
                  <i className="fa fa-search absolute top-1/2 transform -translate-y-1/2 left-3" />
                  <input
                    name="keywords"
                    ref={searchInputRef}
                    type="text"
                    placeholder="What are you looking for?"
                    value={inputValue}
                    onChange={handleUserInput}
                    aria-label="Search resources"
                    aria-invalid={!!errors.searchText}
                    aria-describedby={
                      errors.searchText ? "search-error-message" : undefined
                    }
                    className={`placeholder:italic w-full pr-10 pt-2 pb-1 pl-10 text-md rounded-[20px] text-black bg-white focus:outline-none ${
                      errors.searchText
                        ? "border-2 border-red-500 border-r-0"
                        : ""
                    }`}
                    // onFocus={() => setDropdownOpen((open) => true)}
                    // onBlur={() => setDropdownOpen((open) => false)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      // searchInputRef.current.value = "";
                      setInputValue("");
                      handleUserInput({ target: { value: "" } });
                      handleClearTags();
                    }}
                    //onClick={handleReset}
                    className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-[120%]"
                    aria-label="Reset search"
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
                <div
                  id="dropdownTagsContainer"
                  className="w-full p-1 bg-white rounded-b-[20px] border-t-2 border-[#939AAA] border-collapse max-h-[110px] overflow-y-auto rounded-scrollbar"
                >
                  {filteredTags.length === 0 ? (
                    <div className="border-t-[1px]" />
                  ) : (
                    filteredTags.map(({ tag, id }) => {
                      const isActive = activeTags.some((tag) => tag.id === id);
                      const isDisabled = !isActive && activeTags.length >= 8;

                      return (
                        <a
                          id={id}
                          href={`#${tag.toLowerCase()}`}
                          key={tag}
                          onClick={(e) => {
                            e.preventDefault();
                            if (isDisabled) return;
                            handleTagsInput({
                              target: {
                                value: id,
                                textContent: tag,
                              },
                            });
                          }}
                          className={`block w-full mb-[.5px] rounded-md ${
                            isDisabled
                              ? "text-gray-400 cursor-not-allowed opacity-50"
                              : `hover:font-bold text-gray-950 ${highlightActiveTags(
                                  id
                                )}`
                          }`}
                        >
                          {tag}
                        </a>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </Form>
        </div>
        {showTagPills && !dropdownOpen && (
          <div
            id="containerForSelectedTagsAndClearButton"
            className="flex min-w-[350px] h-auto justify-between m-1"
          >
            <div
              id="tagPillsContainer"
              className="w-[70%] grid grid-cols-3 grid-rows-3 gap-1"
            >
              {activeTags.map((tag) => (
                <div
                  key={tag.id}
                  className="bg-[#A9DEF9] h-[30px] rounded-[10px] relative text-[12px] pl-2 flex items-center justify-between"
                >
                  {tag.name}
                  <button type="button" onClick={() => removeTag(tag.id)}>
                    <i className="fa-solid fa-xmark cursor-pointer pr-2 text-black hover:text-[120%]" />
                  </button>
                </div>
              ))}
            </div>
            <div
              id="tagsResetButtonsContainer"
              className="flex max-w-md w-[30%]"
            >
              <div
                id="clearTagsButton"
                className="w-full flex items-center justify-end relative"
              >
                <i className="fa fa-solid fa-broom absolute top-1/2 transform -translate-y-1/2 left-3 text-[#2E4057]" />
                <button
                  onClick={handleClearTags}
                  className="h-[40px] w-full rounded-[20px] cursor-pointer text-[.8rem] font-bold focus:font-extrabold hover:font-extrabold text-[#2E4057] pl-8"
                >
                  Clear Tags
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div id="submitButton" className="w-[30%] flex justify-center">
        <button
          form="searchTermForm"
          type="submit"
          onClick={handleSubmit}
          className={`h-[30px] w-full max-w-[100px] rounded-[7px] cursor-pointer focus:font-bold hover:font-bold bg-[#2E4057] text-white
          ${
            errors.searchText
              ? "border-2 border-red-500 border-l-0"
              : "border-gray-400 border-l-0"
          }`}
        >
          Search
        </button>
      </div>
    </div>
  );
}
