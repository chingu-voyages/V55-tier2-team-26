import { useContext, useEffect, useState } from "react";
import { ResourcesContext } from "../../context/resources-context";

const ResourceItem = () => {
  const { results, tags } = useContext(ResourcesContext);

  console.log(results);
  console.log(tags);

  const extractUrl = (text) => {
    const match = text.match(/https?:\/\/[^\s]+/);
    return match ? match[0] : "No URL Provided";
  };

  const tagNames = (item) => {
    const getTags = tags
      .filter((tag) => item.includes(tag.id))
      .map((tag) => tag.name);
    return getTags;
  };

  const resourceDate = (date) => {
    const truncatedDate = date.slice(0, 10);

    return truncatedDate;
  };

  // useEffect(() => {}, []);

  return (
    <>
      <div className="p-5">
        {!results
          ? null
          : results.map((i) => {
              const onlyUrl = extractUrl(i.url);
              return (
                <div className="p-5 border-b-1">
                  <div>
                    <a
                      href={onlyUrl}
                      className="text-[20px] mb-2 underline cursor-pointer md:text-[26px]"
                    >
                      {i.name}
                    </a>
                  </div>
                  <div className="mb-2">
                    <a
                      href={onlyUrl}
                      className="text-[14px] mb-2 text-blue-600 cursor-pointer md:text-[16px]"
                    >
                      {onlyUrl}
                    </a>
                  </div>
                  <div>
                    <h1 className="text-[14px] mb-2 md:text-[16px]">
                      {tagNames(i.appliedTags)}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-[14px] mb-2 md:text-[16px]">
                      {i.author}
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-[14px] mb-2 md:text-[16px]">
                      {resourceDate(i.createdAt)}
                    </h1>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default ResourceItem;
