import { PAGINATION } from '@shared/constants';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@shared/components/ui/pagination';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControl = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= PAGINATION.PAGE_OFFSET.PAGE) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > PAGINATION.PAGE_OFFSET.PAGE && onPageChange(page - 1)}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNumber = i + 1;

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={page === pageNumber}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              page < totalPages && onPageChange(page + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
