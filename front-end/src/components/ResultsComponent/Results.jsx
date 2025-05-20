function demoCardComponent({ name, author, url, createdAt, appliedTags, id }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{url}</p>
      <p>{author}</p>
    </div>
  );
}

function getCards(results, activePage) {
  const sliceFrom = activePage === 1 ? activePage - 1 : activePage * 10 - 10;
  const sliceTo = activePage * 10;

  const paginatedResulsts = results.slice(sliceFrom, sliceTo);

  return paginatedResulsts.map((result) => (
    <demoCardComponent
      key={result.id}
      name={result.name}
      author={result.author}
      url={result.url}
    />
  ));
}

export default function Results({ results, activePage }) {
  return <div className="flex border-2">
    {getCards(results, activePage)}
  </div>;
}
