import { FC } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface WorkspacesPaginationProps {
    workspacesPerPage: number;
    totalWorkspaces: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const WorkspacesPagination: FC<WorkspacesPaginationProps> = ({
    workspacesPerPage,
    totalWorkspaces,
    paginate,
    currentPage,
}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalWorkspaces / workspacesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href='#'
                        onClick={() =>
                            paginate(currentPage > 1 ? currentPage - 1 : 1)
                        }
                        isDisabled={currentPage === 1}
                    />
                </PaginationItem>
                {pageNumbers.map((number) => (
                    <PaginationItem key={number}>
                        <PaginationLink
                            href='#'
                            onClick={() => paginate(number)}
                            isActive={number === currentPage}
                        >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href='#'
                        onClick={() =>
                            paginate(
                                currentPage < pageNumbers.length
                                    ? currentPage + 1
                                    : pageNumbers.length,
                            )
                        }
                        isDisabled={currentPage === pageNumbers.length}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default WorkspacesPagination;
