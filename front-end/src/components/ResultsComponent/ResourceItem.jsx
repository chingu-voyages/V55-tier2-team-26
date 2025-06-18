import { useContext } from "react";
import { ResourcesContext } from "../../context/resources-context";

const ResourceItem = ({
  name,
  author,
  url,
  appliedTags,
  createdAt,
  className,
}) => {
  const { tags } = useContext(ResourcesContext);

  const getUrl = (text) => {
    if (!text) {
      return "No URL";
    }
    const match = text.match(/https?:\/\/[^\s]+/);
    return match ? match[0] : "No URL Provided";
  };

  const extractUrl = (text) => {
    if (!text) {
      return "No URL";
    }
    const match = text.match(/https?:\/\/[^\s]+/);
    const truncate = (url) => {
      if (!url) return "";
      return url.length > 10 ? url.substring(0, 40) + "..." : url;
    };
    return truncate(match) ? truncate(match[0]) : "No URL Provided";
  };

  const tagNames = (item) => {
    const getTags = tags
      .filter(({ id: tagId }) => item.find((itemId) => itemId === tagId))
      .map(({ tag }) => tag);
    return getTags;
  };

  const resourceDate = (date) => {
    const truncatedDate = date.slice(0, 10);
    return truncatedDate;
  };

  // useEffect(() => {}, []);

  return (
    <>
      <div className={`p-5 border-1 border-black bg-white ${className}`}>
        <div className="mb-2">
          <a
            href={extractUrl(url)}
            className="text-[16px] mb-2 underline cursor-pointer sm:text-[20px] md:text-[24px] lg:text-[26px]"
          >
            {name}
          </a>
        </div>
        <div className="mb-2">
          <a
            href={getUrl(url)}
            className="text-[12px] mb-2 text-blue-600 cursor-pointer sm:text-[14px] md:text-[14px] lg:text-[16px]"
          >
            {extractUrl(url)}
          </a>
        </div>

        <div>
          <h1 className="text-[12px] mb-2 sm:text-[14px] md:text-[14px] lg:text-[16px]">
            {author}
          </h1>
        </div>
        <div>
          <h1 className="text-[12px] mb-2 sm:text-[14px] md:text-[14px] lg:text-[16px]">
            {resourceDate(createdAt)}
          </h1>
        </div>
        <div>
          <div className="flex flex-row text-[12px] mb-2 sm:text-[14px] md:text-[14px] lg:text-[16px]">
            {/* {tagNames(appliedTags)} */}
            {tagNames(appliedTags).map((i, index) => (
              <div className="mr-2 pl-2 pr-2 rounded-lg bg-[#A9DEF9]">
                <p key={index}>{i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceItem;
