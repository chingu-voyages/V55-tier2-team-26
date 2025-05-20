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
          <PaginationLink isActive={activePage <= 1? true : false} href="#">
            {(activePage <= 1 && 1) ||
              (activePage >= 30 && activePage - 2) ||
              activePage - 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={(activePage <= 1 || activePage >= 30) ? false : true} href="#">
            {(activePage <= 1 && activePage + 1) ||
              (activePage >= 30 && activePage - 1) ||
              activePage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={activePage >= 30? true : false} href="#">
            {(activePage <= 1 && activePage + 2) ||
              (activePage >= 30 && activePage) ||
              activePage + 1}
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
