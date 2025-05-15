import React, { useState } from "react";

export default function SearchBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const tags = [
    "JavaScript",
    "Python",
    "CSS",
    "SQL",
    "Golang",
    "General",
    "HTML",
    "React",
    "TypeScript",
    "Node.js",
    "Next.js",
    "Vue",
    "Git",
    "Github",
    "JS Frameworks",
    "Career",
    "UI/UX Design",
    "Ruby",
    "DevOps",
    "AI",
  ];

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      id="searchFormContainer"
      className="w-[80%] m-auto mt-20 mb-20 flex gap-[10px] items-center justify-center"
    >
      <div id="searchBarContainer">
        <div className="flex items-center ">
          <form className="w-full flex">
            <div className="relative w-full max-w-md rounded-[20px] h-[50px] outline-[1px] flex">
              <button
                type="submit"
                className="absolute left-0 top-0 h-full w-10 rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center cursor-pointer focus:bg-orange-500 bg-blue-500 text-pink-500 text-lg border border-gray-400 border-l-0 hover:bg-orange-500"
              >
                <i className="fa fa-search"></i>
              </button>
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 pl-12 text-lg rounded-[20px] border border-gray-400 bg-green-500 text-white focus:outline-none"
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
              {filteredTags.map((tag) => (
                <a
                  href={`#${tag.toLowerCase()}`}
                  key={tag}
                  className="block w-full p-2 hover:bg-gray-200 rounded-md text-gray-700"
                >
                  {tag}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div id="clearButton" className="w-[10%]">
        <button className="h-[50px] w-full rounded-[20px] cursor-pointer focus:bg-amber-700 hover:bg-amber-700 bg-amber-900 text-yellow-400">
          Clear
        </button>
      </div>
    </div>
  );
}
