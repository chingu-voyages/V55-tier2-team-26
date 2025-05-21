function DemoCardComponent({ name, author, url, createdAt, appliedTags, id, className }) {
  return (
    <div className={className}>
      <h1>{name}</h1>
      <p>{url}</p>
      <p>{author}</p>
    </div>
  );
}

function getCards(results, activePage) {
  const sliceFrom = activePage === 1 ? activePage - 1 : activePage * 10 - 10;
  const sliceTo = activePage * 10;

  console.log(results)
  const paginatedResulsts = results.slice(sliceFrom, sliceTo);

  return paginatedResulsts.map((result,idx) => (
    <DemoCardComponent
      className={"bg-amber-500 p-2 rounded-lg"}
      key={result.id+idx}
      name={result.name}
      author={result.author}
      url={result.url}
    />
  ));
}

export default function Results({ results, activePage }) {
  return <div className="grid grid-cols-1 border-6 rounded-sm gap-y-10 max-sm:p-2 md:p-5 lg:p-">
    {getCards(results, activePage)}
  </div>;
}
