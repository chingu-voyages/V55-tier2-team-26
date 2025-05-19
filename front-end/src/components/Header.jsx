import { useState } from "react";

const Header = () => {
  const getCurrentDateUTC = () => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    const monthName = () => {
      if (month === "01") {
        return "January";
      } else if (month === "02") {
        return "February";
      } else if (month === "03") {
        return "March";
      } else if (month === "04") {
        return "April";
      } else if (month === "05") {
        return "May";
      } else if (month === "06") {
        return "June";
      } else if (month === "07") {
        return "July";
      } else if (month === "08") {
        return "August";
      } else if (month === "09") {
        return "September";
      } else if (month === "10") {
        return "October";
      } else if (month === "11") {
        return "November";
      } else if (month === "12") {
        return "December";
      }
    };
    return `${monthName()} ${day}, ${year}`;
  };

  return (
    <div className="h-30 flex items-center text-center justify-between p-4 border-solid border-2 border-gray-400 rounded-md bg-blue-900 text-white text-[14px]">
      <div className="w-40">
        <h1>[App Name]</h1>
      </div>
      <div className="w-full text-[20px] sm:text-[24px]">
        <h1>{getCurrentDateUTC()}</h1>
      </div>
      <div className="w-40">
        <h1>[Logo]</h1>
      </div>
    </div>
  );
};

export default Header;
