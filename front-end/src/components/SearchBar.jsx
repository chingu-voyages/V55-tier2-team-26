import React, { useState } from "react";

export default function SearchBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const tags = ["JavaScript", "Python"];

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      id="searchFormContainer"
      className="w-md m-auto mt-20 flex flex-col gap-y-20"
    >
      <div id="clearButton">
        <h1>Clear </h1>
      </div>

      <div id="searchTextBar">
        <div className="flex flex-col items-center space-y-6 p-6">
          <form className="w-full flex">
            <div className="relative w-full max-w-sm rounded-[20px] outline-[1px] flex">
              <button
                type="submit"
                className="absolute left-0 top-0 h-full w-10 rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center bg-blue-500 text-pink-500 text-lg border border-gray-400 border-l-0 hover:bg-orange-500"
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

      <div id="tagsDropdown">
        <div className="dropdown">
          <button className="[bg-#04AA6D] text-[purple] p-[16px] text-[16px] cursor-pointer"
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            Dropdown
          </button>
          {dropdownOpen && (
            <div id="myDropdown">
              <input
                type="text"
                placeholder="Tag..."
                id="myInput"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              {filteredTags.map((tag) => (
                <a href={`#${tag.toLowerCase()}`} key={tag}>
                  {tag}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/*             
          <div id="myDropdown">
            <input
              type="text"
              placeholder="Search.."
              id="myInput"
              onkeyup="filterFunction()"
            />
            <a href="#about">About</a>
            <a href="#base">Base</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
            <a href="#custom">Custom</a>
            <a href="#support">Support</a>
            <a href="#tools">Tools</a>
          </div>
        </div>
      </div> */}
      {/* <script>

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const div = document.getElementById("myDropdown");
  const a = div.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
</script> */}
    </div>
  );
}
