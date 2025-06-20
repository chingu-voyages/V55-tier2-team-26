import ResourceItem from "./ResourceItem";

function getCards(results, activePage) {
  const sliceFrom = activePage === 1 ? activePage - 1 : activePage * 10 - 10;
  const sliceTo = activePage * 10;

  const paginatedResulsts = results.slice(sliceFrom, sliceTo);

  return paginatedResulsts.map((result, idx) =>{ 
    return (<ResourceItem
      className={`${results.length===idx+1?"mb-12":''}`}
      key={result.id + idx}
      name={result.name}
      author={result.author}
      url={result.url}
      appliedTags={result.appliedTags}
      createdAt={result.createdAt}
    />
  )});
}

export default function Results({ results, activePage, className }) {
  return (
    <div
      className={` grid grid-cols-1 gap-y-10 overflow-y-scroll overflow-x-hidden max-sm:px-5 md:px-40 xl:px-90 ${className}`}
    >
      {/*<div className="flex flex-col items-center gap-y-10 max-sm:p-2 md:p-5 lg:p-">*/}
      {getCards(results, activePage)}
    </div>
  );
}
