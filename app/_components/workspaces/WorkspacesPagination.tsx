import { FC } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface WorkspacesPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const WorkspacesPagination: FC<WorkspacesPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href='#'
                        onClick={() => onPageChange(currentPage - 1)}
                        isDisabled={currentPage === 1}
                    />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href='#'
                            onClick={() => onPageChange(index + 1)}
                            isActive={index + 1 === currentPage}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href='#'
                        onClick={() => onPageChange(currentPage + 1)}
                        isDisabled={currentPage === totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default WorkspacesPagination;