import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

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

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="h-12 sm:h-14 md:h-16 grid grid-cols-3 items-center bg-[#998675]">
      <div className="flex items-end ml-3 sm:ml-4 md:ml-6">
        <FaHome 
          className="text-[#2E4057] text-2xl sm:text-3xl md:text-4xl cursor-pointer hover:text-[#222222] transition-colors"
          style={{
            filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16))",
            opacity: 1
          }}
          onClick={handleHomeClick}
        />
      </div>
      <div className="text-center">
        <h1 className="font-inter font-normal text-base md:text-lg text-[#222222]">{getCurrentDateUTC()}</h1>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
