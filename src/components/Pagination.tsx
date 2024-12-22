import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ChangeEvent } from "react";

type Props = {
  data: Comment[];
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
};

const Pagination = ({
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setItemsPerPage,
}: Props) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    paginationNumbers.push(i);
  }

  const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const startIdx = (currentPage - 1) * 10;
  const endIdx = (currentPage - 1) * 10 + itemsPerPage;

  return (
    <div className="flex items-center gap-4 text-sm justify-end text-primary font-medium mb-10 w-full">
      <span>
        {startIdx} - {endIdx} of {data.length} items
      </span>

      <div className="w-fit flex gap-2">
        <ChevronLeft
          className={`w-4 h-auto cursor-pointer ${
            currentPage === 1 ? "text-gray-400" : ""
          }`}
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        />

        <div className="flex max-w-40 w-fit gap-2 overflow-x-auto scrollbar py-3">
          {paginationNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`rounded-md px-2 py-1 ${
                pageNumber === currentPage
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <ChevronRight
          className={`w-4 h-auto cursor-pointer ${
            currentPage === paginationNumbers.length ? "text-gray-400" : ""
          }`}
          onClick={() => {
            if (currentPage < paginationNumbers.length) {
              setCurrentPage(currentPage + 1);
            }
          }}
        />
      </div>

      <select
        value={itemsPerPage}
        onChange={handleItemsPerPage}
        className="outline-none bg-white text-primary flex px-2 py-1 gap-2 items-center rounded-md border hover:shadow-md transition-all"
      >
        <option value={10}>
          10 /Page <ChevronDown className="w-4 h-auto" />
        </option>
        <option value={50}>
          50 /Page <ChevronDown className="w-4 h-auto" />
        </option>
        <option value={100}>
          100 /Page <ChevronDown className="w-4 h-auto" />
        </option>
      </select>
    </div>
  );
};

export default Pagination;
