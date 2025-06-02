import { Form, useSearchParams } from "react-router";
import { useContext, useState, useEffect } from "react";

import { ResourcesContext } from "../context/resources-context";
import { FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

export default function SearchBar() {
  const [searchParams] = useSearchParams();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [errors, setErrors] = useState({ searchText: "" });
  const [info, setInfo] = useState({ tags: "" });
  const queryParams = searchParams.get("keywords");

  const {
    tags,
    results,
    searchInputRef,
    activeTags,
    searchOnPageload,
    handleUserInput: baseHandleUserInput,
    handleTagsInput: baseHandleTagsInput,
    clearAllTags,
  } = useContext(ResourcesContext);

  const tagStyles = {
    activeTag: "bg-[#A9DEF9] text-black",
    inactiveTag: "bg-[#f6f6f6] text-black",
  };

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

    if (activeTags.findIndex((activeTag) => activeTag.id === tagId) !== -1) {
      baseHandleTagsInput(e);
      return;
    }

    if (activeTags.length >= 8) {
      return;
    }

    baseHandleTagsInput(e);
  };

  const handleSubmit = (e) => {
    const currentSearchText = searchInputRef.current.value;
    const tagIds = activeTags.map((tag) => tag.id);

    const isSearchTextValid = validateSearchText(currentSearchText);
    const isTagsValid = activeTags.length <= 8;

    if (!isSearchTextValid || !isTagsValid) {
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
    setErrors({ searchText: "", tags: "" });
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
    if (queryParams !== searchInputRef.current.value) {
      searchInputRef.current.value = queryParams;
      searchOnPageload(queryParams);
    }
  }, []);

  return (
    <div
      id="searchFormContainer"
      className="w-[90%] m-auto mt-4 mb-20 flex flex-col gap-[15px] items-center justify-between rounded-[20px]"
    >
      <div id="searchBarContainer" className="w-full flex justify-center">
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
              className={`absolute top-[-35px] left-0 text-base font-medium flex items-center gap-[6px] whitespace-nowrap ${
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
                    searchInputRef.current.value = "";
                    handleUserInput({ target: { value: "" } });
                  }}
                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-[120%]"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            )}
            {dropdownOpen && (
              <div
                id="theActualSearchBarWithDropdownOpen"
                className="relative w-full max-w-md rounded-t-[20px] flex flex-col bg-white border-1 border-[#939AAA]"
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
                    onBlur={() => setDropdownOpen((open) => false)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      searchInputRef.current.value = "";
                      handleUserInput({ target: { value: "" } });
                    }}
                    className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-[120%]"
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
                <div
                  id="dropdownTagsContainer"
                  className="w-full p-1 bg-white rounded-b-[10px] border-t-2 border-[#939AAA] border-collapse"
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
                            console.log("Selected tag ID:", id);
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
      </div>

      <div id="containerForSelectedTagsAndClearButton">
        <div id="selectedTagsContainer"></div>

        <div
          id="tagsResetButtonsContainer"
          className="flex w-full max-w-md justify-between w-[30%]"
        >
          <div id="clearButton" className="w-full flex justify-end relative">
            <i className="fa fa-solid fa-broom absolute top-1/2 transform -translate-y-1/2 left-3 text-[#2E4057]" />
            <button
              onClick={handleClearTags}
              className="h-[40px] w-full rounded-[20px] cursor-pointer focus:font-extrabold hover:font-extrabold text-[#2E4057] pl-8"
            >
              Clear Tags
            </button>
          </div>
        </div>
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
          Submit
        </button>
      </div>
    </div>
  );
}
