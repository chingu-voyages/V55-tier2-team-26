import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ResultsPagination({ activePage, onClick }) {
  console.log(activePage);

  const paginationItemOneValue =
    (activePage <= 1 && 1) ||
    (activePage >= 30 && activePage - 2) ||
    activePage - 1;

  const paginationItemTwoValue =
    (activePage <= 1 && activePage + 1) ||
    (activePage >= 30 && activePage - 1) ||
    activePage;

  const paginationItemThreeValue =
    (activePage <= 1 && activePage + 2) ||
    (activePage >= 30 && activePage) ||
    activePage + 1;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) =>
              activePage <= 1 ? e.preventDefault() : onClick(activePage - 1)
            }
            to={`/search?page=${activePage - 1}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={(e) => {
              const pageNumber = parseInt(e.target.innerText);
              console.log(pageNumber);
              activePage <= 1 ? e.preventDefault() : onClick(pageNumber);
            }}
            isActive={activePage <= 1 ? true : false}
            to={`/search?page=${paginationItemOneValue}`}
          >
            {paginationItemOneValue}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={(e) => {
              const pageNumber = parseInt(e.target.innerText);
              console.log(pageNumber);
              pageNumber === activePage
                ? e.preventDefault()
                : onClick(pageNumber);
            }}
            isActive={activePage <= 1 || activePage >= 30 ? false : true}
            to={`/search?page=${paginationItemTwoValue}`}
          >
            {paginationItemTwoValue}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={(e) => {
              const pageNumber = parseInt(e.target.innerText);
              console.log(pageNumber);
              activePage >= 30 ? e.preventDefault() : onClick(pageNumber);
            }}
            isActive={activePage >= 30 ? true : false}
            to={`/search?page=${paginationItemThreeValue}`}
          >
            {paginationItemThreeValue}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={(e) =>
              activePage >= 30 ? e.preventDefault() : onClick(activePage + 1)
            }
            to={`/search?page=${activePage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
