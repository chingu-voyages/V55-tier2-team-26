import ResourceItem from "./ResourceItem";

function getCards(results, activePage) {
  const sliceFrom = activePage === 1 ? activePage - 1 : activePage * 10 - 10;
  const sliceTo = activePage * 10;

  const paginatedResulsts = results.slice(sliceFrom, sliceTo);

  return paginatedResulsts.map((result, idx) => (
    <ResourceItem
      className={"bg-amber-500 p-2 rounded-lg"}
      key={result.id + idx}
      name={result.name}
      author={result.author}
      url={result.url}
      appliedTags={result.appliedTags}
      createdAt={result.createdAt}
    />
  ));
}

export default function Results({ results, activePage }) {
  return (
    <div className="flex flex-col items-center gap-y-10 max-sm:p-2 md:p-5 lg:p-">
      {getCards(results, activePage)}
    </div>
  );
}
