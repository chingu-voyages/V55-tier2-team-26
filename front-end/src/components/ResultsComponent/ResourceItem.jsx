import { useContext} from "react";
import { ResourcesContext } from "../../context/resources-context";

const ResourceItem = ({ name, author, url, appliedTags, createdAt }) => {
  const { tags } = useContext(ResourcesContext);

  const extractUrl = (text) => {
    if (!text) {
      return "No URL";
    }
    const match = text.match(/https?:\/\/[^\s]+/);
    return match ? match[0] : "No URL Provided";
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
      <div className="p-5 border-b-1">
        <div className="mb-2">
          <a
            href={extractUrl(url)}
            className="text-[20px] mb-2 underline cursor-pointer md:text-[26px]"
          >
            {name}
          </a>
        </div>
        <div className="mb-2">
          <a
            href={extractUrl(url)}
            className="text-[14px] mb-2 text-blue-600 cursor-pointer md:text-[16px]"
          >
            {extractUrl(url)}
          </a>
        </div>
        <div>
          <h1 className="text-[14px] mb-2 md:text-[16px]">
            {tagNames(appliedTags)}
          </h1>
        </div>
        <div>
          <h1 className="text-[14px] mb-2 md:text-[16px]">{author}</h1>
        </div>
        <div>
          <h1 className="text-[14px] mb-2 md:text-[16px]">
            {resourceDate(createdAt)}
          </h1>
        </div>
      </div>
    </>
  );
};

export default ResourceItem;
