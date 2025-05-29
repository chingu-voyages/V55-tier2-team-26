import { useSearchParams } from "react-router";
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
  totalResults,
}) {
  const [searchParams] = useSearchParams();
  const maxPages = Math.ceil(totalResults / 10);

  const buildPageUrl = (pageNumber) => {
    const validPageNumber = Math.max(1, Math.min(pageNumber, maxPages));
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", validPageNumber);
    return `/search?${newParams.toString()}`;
  };

  const paginationItemOneValue = Math.min(
    (activePage <= 1 && 1) ||
    (activePage >= maxPages && activePage - 2) ||
    activePage - 1,
    maxPages
  );
    

  const paginationItemTwoValue = Math.min(
    (activePage <= 1 && activePage + 1) ||
    ((activePage >= maxPages && maxPages>=3) && activePage - 1) ||
    activePage,
    maxPages
  );

  const paginationItemThreeValue = Math.min(
    (activePage <= 1 && activePage + 2) ||
    (activePage >= maxPages && activePage) ||
    activePage + 1,
    maxPages
  );

  return totalResults <= 10 ? null : (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={buildPageUrl(activePage - 1)}
            className={activePage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={activePage === paginationItemOneValue ? true : false}
            to={buildPageUrl(paginationItemOneValue)}
          >
            {paginationItemOneValue}
          </PaginationLink>
        </PaginationItem>

        {totalResults >= 11 ? (
          <PaginationItem>
            <PaginationLink
              isActive={activePage === paginationItemTwoValue ? true : false}
              to={buildPageUrl(paginationItemTwoValue)}
            >
              {paginationItemTwoValue}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {totalResults >= 21 ? (
          <PaginationItem>
            <PaginationLink
              isActive={activePage === paginationItemThreeValue ? true : false}
              to={buildPageUrl(paginationItemThreeValue)}
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
            to={buildPageUrl(activePage + 1)}
            className={activePage >= maxPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
