import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ResultsPagination({
  activePage,
  onClick,
  totalResults,
}) {
  const maxPages = Math.ceil(totalResults / 10);

  const paginationItemOneValue =
    (activePage <= 1 && 1) ||
    (activePage >= maxPages && activePage - 2) ||
    activePage - 1;

  const paginationItemTwoValue =
    (activePage <= 1 && activePage + 1) ||
    ((activePage >= maxPages && maxPages>=3) && activePage - 1) ||
    activePage;

  const paginationItemThreeValue =
    (activePage <= 1 && activePage + 2) ||
    (activePage >= maxPages && activePage) ||
    activePage + 1;

  return totalResults <= 10 ? null : (
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
            isActive={activePage === paginationItemOneValue ? true : false}
            to={`/search?page=${paginationItemOneValue}`}
          >
            {paginationItemOneValue}
          </PaginationLink>
        </PaginationItem>

        {totalResults >= 11 ? (
          <PaginationItem>
            <PaginationLink
              onClick={(e) => {
                const pageNumber = parseInt(e.target.innerText);
                pageNumber === activePage
                  ? e.preventDefault()
                  : onClick(pageNumber);
              }}
              isActive={activePage === paginationItemTwoValue ? true : false}
              to={`/search?page=${paginationItemTwoValue}`}
            >
              {paginationItemTwoValue}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {totalResults >= 21 ? (
          <PaginationItem>
            <PaginationLink
              onClick={(e) => {
                const pageNumber = parseInt(e.target.innerText);
                activePage >= maxPages
                  ? e.preventDefault()
                  : onClick(pageNumber);
              }}
              isActive={activePage === paginationItemThreeValue ? true : false}
              to={`/search?page=${paginationItemThreeValue}`}
            >
              {paginationItemThreeValue}
            </PaginationLink>
          </PaginationItem>
        ) : null}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={(e) =>
              activePage >= maxPages
                ? e.preventDefault()
                : onClick(activePage + 1)
            }
            to={`/search?page=${activePage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
