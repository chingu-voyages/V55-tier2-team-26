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
  const navigate = useNavigate();
  const location = useLocation();

  const {
    tags,
    searchInputRef,
    activeTags,
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
      if (!searchArea.contains(event.target)) {
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
    if (validateSearchText(e.target.value)) {
      baseHandleUserInput(e);
    }
  };

  const handleTagsInput = (e) => {
    const tagId = e.target.value;
    const tagName = e.target.textContent;

    baseHandleTagsInput(e);
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

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }

    baseHandleUserInput({ target: { value: "" } });

    clearAllTags();
    setErrors({ searchText: "", tags: "" });

    // Clears URL params if on the search page
    if (location.pathname === "/search") {
      return setSearchParams({});
    }

    setSearchParams({});
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

  return (
    <div
      id="searchFormContainer"
      className="w-[90%] min-h-[100px] max-h-content m-auto mt-4 pb-2 flex flex-col gap-[15px] items-center justify-between rounded-[20px]"
    >
      <div
        id="searchBarContainer"
        className="w-full flex flex-col items-center justify-center"
      >
        <div
          className={`flex items-center relative min-w-[350px] ${
            errors.searchText || (info.tags && location.pathname === "/search")
              ? "mt-8"
              : ""
          }`}
        >
          {errors.searchText && (
            <div
              id="search-error-message"
              role="alert"
              className="absolute top-[-25px] left-0 text-red-500 text-base font-inter font-semibold text-sm flex items-center gap-[6px] whitespace-nowrap"
            >
              <FaExclamationCircle aria-hidden="true" />
              {errors.searchText}
            </div>
          )}
          {info.tags && (
            <div
              id="tags-info-message"
              className={`absolute top-[-24px] left-3 text-sm font-inter font-semibold flex items-center gap-[6px] whitespace-nowrap ${
                activeTags.length === 8 && "text-[#2E4057]"
              }`}
            >
              <FaInfoCircle aria-hidden="true" />
              {info.tags}
            </div>
          )}

          <Form
            id="searchTermForm"
            action={"/search"}
            className="w-full flex dropdown"
            onSubmit={handleSubmit}
            method="get"
          >
            <div
              id={
                dropdownOpen
                  ? "theActualSearchBarWithDropdownOpen"
                  : "theActualSearchBar"
              }
              className={`relative w-full max-w-md ${
                dropdownOpen
                  ? "rounded-t-[20px] flex flex-col bg-white border-1 border-[#939AAA]"
                  : "rounded-[20px] h-[40px] border-1 border-[#939AAA] flex"
              }`}
            >
              <div
                id={dropdownOpen ? "searchAndClearIconsContainer" : undefined}
                className="relative w-full flex items-center"
              >
                <button
                  form="searchTermForm"
                  type="submit"
                  onClick={handleSubmit}
                  className="fa fa-search absolute top-1/2 transform -translate-y-1/2 left-3"
                />
                <input
                  name="keywords"
                  ref={searchInputRef}
                  type="text"
                  placeholder="What are you looking for?"
                  onChange={handleUserInput}
                  aria-label="Search resources"
                  aria-invalid={!!errors.searchText}
                  aria-describedby={
                    errors.searchText ? "search-error-message" : undefined
                  }
                  className={`placeholder:italic placeholder:font-inter placeholder:text-[#222222] placeholder:font-extralight w-full pt-2 pl-10 pr-10 ${
                    dropdownOpen ? "pb-1" : "pb-2"
                  } text-md rounded-[20px] bg-white text-black focus:outline-none ${
                    errors.searchText
                      ? "border-2 border-red-500"
                      : dropdownOpen
                      ? ""
                      : "border border-[#2E4057]"
                  }`}
                  onClick={() => setDropdownOpen((open) => true)}
                  onFocus={() => setDropdownOpen((open) => true)}
                />
                <button
                  id="xResetButton"
                  type="button"
                  onClick={() => {
                    handleReset();
                    handleClearTags();
                  }}
                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-[120%]"
                  aria-label="Reset search"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              {dropdownOpen && (
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
              )}
            </div>
          </Form>
        </div>
        {showTagPills && !dropdownOpen && (
          <div
            id="containerForSelectedTagsAndClearButton"
            className="flex min-w-[350px] h-[fit-content] justify-between m-1"
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
                  <button
                    type="button"
                    onClick={() =>
                      handleTagsInput({
                        target: { value: tag.id, textContent: tag.name },
                      })
                    }
                  >
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
        {location.pathname === "/search" ? null : (
          <div id="submitButton" className="w-[30%] flex justify-center mt-20">
            <button
              form="searchTermForm"
              type="submit"
              onClick={handleSubmit}
              style={{
                boxShadow: "0px 3px 6px #00000029",
                opacity: 1,
              }}
              className={`h-[35px] w-full max-w-[120px] rounded-[7px] cursor-pointer bg-[#2E4057] hover:bg-[#91CEF9] text-white font-inter font-light text-base
          ${errors.searchText ? "border-2 border-red-500" : "border-gray-400"}`}
            >
              Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
