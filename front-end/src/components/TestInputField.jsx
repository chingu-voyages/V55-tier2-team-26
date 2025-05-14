import { useContext } from "react";
import { ResourcesContext } from "../context/resources-context";

export default function TestInputField() {
  const { tags, activeTags, isFetching, handleUserInput, handleTagsInput } = useContext(ResourcesContext);

  const loadTags = () => {
    return (
      <>
        {isFetching.tags ? (
          <select disabled></select>
        ) : (
          <select size={10} onChange={handleTagsInput}>
            {tags.map(({tag, id}) => (<>
                <option key={id} id={id} value={id} className={activeTags.includes(id)?'bg-amber-300':null}>{tag}</option>
            </>
            ))}
          </select>
        )}
      </>
    );
  };

  return (
    <div className="w-40">
      <input type="search" className="p-4 border-2" onChange={handleUserInput}/>
      {loadTags()}
    </div>
  );
}
