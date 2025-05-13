import React from "react";

export default function SearchBar() {
  return (
    <div
      id="searchFormContainer"
      className="w-md m-auto mt-20 flex flex-col gap-y-20"
    >
      <div id="clearButton">
        <h1>Clear </h1>
      </div>
      <div id="searchBar">
        <div className="flex flex-col items-center space-y-6 p-6">
          <form className="w-full flex">
            <input
              type="text"
              placeholder="Search..."
              className="w-4/5 p-2 text-lg border border-gray-400 bg-green-500 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="w-1/5 p-2 bg-blue-500 text-pink-500 text-lg border border-gray-400 border-l-0 hover:bg-orange-500"
            >
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      <div id="SubmitButton">
        <h1>Submit</h1>
      </div>
    </div>
  );
}
