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
  className,
}) {
  const maxPages = Math.ceil(totalResults / 10);

  const paginationItemOneValue =
    (activePage <= 1 && 1) ||
    (activePage >= maxPages && activePage - 2) ||
    activePage - 1;

  const paginationItemTwoValue =
    (activePage <= 1 && activePage + 1) ||
    (activePage >= maxPages && maxPages >= 3 && activePage - 1) ||
    activePage;

  const paginationItemThreeValue =
    (activePage <= 1 && activePage + 2) ||
    (activePage >= maxPages && activePage) ||
    activePage + 1;

  return totalResults <= 10 ? null : (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`hover:bg-[#222222] hover:text-white ${
              activePage <= 1 ? "pointer-events-none text-[#505050]" : null
            }`}
            onClick={(e) =>
              activePage <= 1 ? e.preventDefault() : onClick(activePage - 1)
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={`${
              activePage === paginationItemOneValue
                ? "bg-[#2E4057] text-white"
                : ""
            } hover:bg-[#222222] hover:text-white`}
            onClick={(e) => {
              const pageNumber = parseInt(e.target.innerText);
              activePage <= 1 ? e.preventDefault() : onClick(pageNumber);
            }}
            isActive={activePage === paginationItemOneValue ? true : false}
          >
            {paginationItemOneValue}
          </PaginationLink>
        </PaginationItem>

        {totalResults >= 11 ? (
          <PaginationItem>
            <PaginationLink
              className={`${
                activePage === paginationItemTwoValue
                  ? "bg-[#2E4057] text-white"
                  : ""
              } hover:bg-[#222222] hover:text-white`}
              onClick={(e) => {
                const pageNumber = parseInt(e.target.innerText);
                pageNumber === activePage
                  ? e.preventDefault()
                  : onClick(pageNumber);
              }}
              isActive={activePage === paginationItemTwoValue ? true : false}
            >
              {paginationItemTwoValue}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {totalResults >= 21 ? (
          <PaginationItem>
            <PaginationLink
              className={`${
                activePage === paginationItemThreeValue
                  ? "bg-[#2E4057] text-white"
                  : ""
              } hover:bg-[#222222] hover:text-white`}
              onClick={(e) => {
                const pageNumber = parseInt(e.target.innerText);
                activePage >= maxPages
                  ? e.preventDefault()
                  : onClick(pageNumber);
              }}
              isActive={activePage === paginationItemThreeValue ? true : false}
            >
              {paginationItemThreeValue}
            </PaginationLink>
          </PaginationItem>
        ) : null}
        <PaginationItem>
          {activePage + 1 >= maxPages ? null : <PaginationEllipsis />}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={(e) =>
              activePage >= maxPages
                ? e.preventDefault()
                : onClick(activePage + 1)
            }
            className={`hover:bg-[#222222] hover:text-white ${activePage >= maxPages ? "pointer-events-none text-[#505050]" : null}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
