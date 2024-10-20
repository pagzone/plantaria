import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { FC } from "react";

interface PageSelectorProps {
	totalItems: number; // Use total from API response
	currentPage: number;
	setCurrentPage: (page: number) => void;
	itemsPerPage: number;
}

const PageSelector: FC<PageSelectorProps> = ({
	totalItems,
	currentPage,
	setCurrentPage,
	itemsPerPage,
}) => {
	// Calculate total pages based on totalItems from the API
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const maxPageLinks = 5; // Maximum number of pagination links to display
	const startPage = Math.max(1, currentPage - Math.floor(maxPageLinks / 2));
	const endPage = Math.min(totalPages, startPage + maxPageLinks - 1);

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className="cursor-pointer"
						onClick={() => handlePageChange(currentPage - 1)}
						isActive={currentPage > 1}
					/>
				</PaginationItem>

				{/* Render pagination links */}
				{Array.from({ length: endPage - startPage + 1 }, (_, index) => {
					const page = startPage + index;
					return (
						<PaginationItem key={page}>
							<PaginationLink
								className="cursor-pointer"
								isActive={currentPage === page}
								onClick={() => handlePageChange(page)}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				{/* Show ellipsis if necessary */}
				{totalPages > maxPageLinks && endPage < totalPages && (
					<PaginationEllipsis />
				)}

				<PaginationItem>
					<PaginationNext
						className="cursor-pointer"
						onClick={() => handlePageChange(currentPage + 1)}
						isActive={currentPage < totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PageSelector;