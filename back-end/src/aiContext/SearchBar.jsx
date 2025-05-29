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
      ? "bg-[#6D597A] text-white"
      : "bg-[#f6f6f6] text-black";

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
      className="w-[80%] m-auto mt-20 mb-20 flex flex-col gap-[15px] items-center justify-between"
    >
      <div id="searchBarContainer" className="w-md">
        <div className="flex items-center relative">
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
            action={"/search"}
            className="w-full flex"
            onSubmit={handleSubmit}
            method="get"
          >
            <div className="relative w-full max-w-md rounded-[20px] h-[40px] outline-[1px] flex">
              <button
                type="submit"
                className={`absolute right-0 top-0 h-full w-[20%] rounded-tr-[20px] rounded-br-[20px] flex items-center justify-center cursor-pointer focus:font-bold bg-[#A9DEF9] text-[#22222] text-md hover:font-bold ${
                  errors.searchText
                    ? "border-2 border-red-500 border-l-0"
                    : "border-gray-400 border-l-0"
                }`}
              >
                Submit
                {/* <i className="fa fa-search"></i> */}
              </button>
              <i className="fa fa-search absolute top-1/2 transform -translate-y-1/2 left-3" />
              <input
                name="keywords"
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                onChange={handleUserInput}
                aria-label="Search resources"
                aria-invalid={!!errors.searchText}
                aria-describedby={
                  errors.searchText ? "search-error-message" : undefined
                }
                className={`w-full p-2 pl-10 text-lg rounded-[20px] bg-[#F9F5FF] text-black focus:outline-none ${
                  errors.searchText
                    ? "border-2 border-red-500 border-r-0"
                    : "border border-[#F9F5FF] border-l-0"
                }`}
              />
            </div>
          </Form>
        </div>
      </div>

      <div
        id="tagsResetButtonsContainer"
        className="flex w-full max-w-md justify-between"
      >
        <div id="tagsDropdownContainer" className="relative w-[75%]">
          <div className="dropdown w-full">
            {!dropdownOpen && (
              <button
                className="w-full h-[40px] rounded-[20px] bg-[#2E4057] text-white text-[16px] cursor-pointer hover:font-bold focus:font-bold"
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-describedby={info.tags ? "tags-info-message" : undefined}
                aria-label="Select tags to filter results"
              >
                Tags
              </button>
            )}
            {dropdownOpen && (
              <div
                id="myDropdown"
                className="absolute left-0 w-full p-2 flex flex-col bg-[#f6f6f6] rounded-t-[20px] border-t-[1px] border-r-[1px] border-l-[1px]"
              >
                <div id="tagsSearchBarContainer" className="flex ">
                  <input
                    type="text"
                    placeholder="Search tags..."
                    id="myInput"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                  <button
                    id="closeTagsDropdown"
                    className="absolute w-[40px] right-[0px] w-[14px] top-[0px] h-[40px] hover:scale-120 focus:scale-120"
                    onClick={() => setDropdownOpen((open) => !open)}
                  >
                    <i className="fa-solid fa-xmark top-1/2 absolute transform -translate-y-1/2 -translate-x-1/2" />
                  </button>
                </div>
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
                        className={`block w-full p-1 m-[.5px] rounded-md ${
                          isDisabled
                            ? "text-gray-400 cursor-not-allowed opacity-50"
                            : `hover:font-bold text-gray-700 ${highlightActiveTags(
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
        </div>

        <div id="clearButton" className="w-[20%] flex justify-end">
          <button
            onClick={handleClear}
            className="h-[40px] w-full rounded-[20px] cursor-pointer focus:font-bold hover:font-bold bg-[#A9DEF9] text-black"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
