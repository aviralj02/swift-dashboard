import { useEffect, useState } from "react";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import PageWrapper from "../components/PageWrapper";
import SearchBar from "../components/SearchBar";
import SortIcon from "../components/SortIcon";
import { LoaderCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import Pagination from "../components/Pagination";
import { SortColumn, SortOrder } from "../types/enums";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // DATA STATES
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [currentComments, setCurrentComments] = useState<Comment[] | null>(
    null
  );
  const [paginatedComments, setPaginatedComments] = useState<Comment[] | null>(
    null
  );
  const [filteredComments, setFilteredComments] = useState<Comment[] | null>(
    null
  );

  // SEARCHING STATES
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  // SORTING STATES
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const startIdx = (currentPage - 1) * 10;
  const endIdx = (currentPage - 1) * 10 + itemsPerPage;

  useEffect(() => {
    fetchCommentsData();

    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("filter");
    if (searchQuery) {
      setSearch(searchQuery);
      setDebouncedSearch(searchQuery);
    }

    const querySortColumn = queryParams.get("sortColumn");
    const querySortOrder = queryParams.get("sortOrder");
    if (querySortColumn) {
      setSortColumn(querySortColumn as SortColumn);
    }
    if (querySortOrder) {
      setSortOrder(querySortOrder as SortOrder);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    updateQueryParams();
  }, [debouncedSearch, sortColumn, sortOrder]);

  useEffect(() => {
    if (debouncedSearch === "") {
      setFilteredComments(comments);
      setCurrentComments(comments);
    } else {
      handleSearch();
    }
  }, [debouncedSearch, comments]);

  useEffect(() => {
    if (sortColumn) {
      handleSort();
    }
  }, [sortColumn, sortOrder, filteredComments]);

  useEffect(() => {
    paginateData();
  }, [currentComments, currentPage, itemsPerPage]);

  const fetchCommentsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = await response.json();

      setComments(data);
      setCurrentComments(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    if (!comments) return;

    const filteredData = comments?.filter(
      (comment) =>
        comment.name.toLowerCase().includes(search.toLowerCase()) ||
        comment.email.toLowerCase().includes(search.toLowerCase()) ||
        comment.body.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredComments(filteredData);
    setCurrentComments(filteredData);
  };

  const handleSort = () => {
    if (!currentComments || !sortColumn) return;

    if (!sortOrder) {
      setCurrentComments(filteredComments);
      return;
    }

    const sortedComments = [...currentComments].sort((a, b) => {
      const valueA: string | number = a[sortColumn];
      const valueB: string | number = b[sortColumn];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === SortOrder.ASC
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortOrder === SortOrder.ASC
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });

    setCurrentComments(sortedComments);
  };

  const updateQueryParams = () => {
    const queryParams = new URLSearchParams(location.search);
    if (debouncedSearch) {
      queryParams.set("filter", debouncedSearch);
    } else {
      queryParams.delete("filter");
    }

    if (sortColumn) {
      queryParams.set("sortColumn", sortColumn);
    } else {
      queryParams.delete("sortColumn");
    }

    if (sortOrder) {
      queryParams.set("sortOrder", sortOrder);
    } else {
      queryParams.delete("sortOrder");
    }

    navigate({ search: queryParams.toString() });
  };

  const paginateData = () => {
    if (!currentComments) return;

    setPaginatedComments(currentComments?.slice(startIdx, endIdx));
  };

  const handleSortClick = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => {
        switch (prevOrder) {
          case SortOrder.ASC:
            return SortOrder.DESC;
          case SortOrder.DESC:
            return null;
          case null:
            return SortOrder.ASC;
          default:
            return SortOrder.ASC;
        }
      });
    } else {
      setSortColumn(column);
      setSortOrder(SortOrder.ASC);
    }
  };

  return (
    <PageWrapper className="flex flex-col gap-6 w-full">
      <div className="mt-6 flex lg:flex-row flex-col-reverse lg:items-end items-start gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <Button
            label="Sort Post ID"
            icon={
              <SortIcon
                sortOrder={sortOrder}
                isActive={sortColumn === SortColumn.POSTID}
              />
            }
            onClick={() => handleSortClick(SortColumn.POSTID)}
          />
          <Button
            label="Sort Name"
            icon={
              <SortIcon
                sortOrder={sortOrder}
                isActive={sortColumn === SortColumn.NAME}
              />
            }
            onClick={() => handleSortClick(SortColumn.NAME)}
          />
          <Button
            label="Sort Email"
            icon={
              <SortIcon
                sortOrder={sortOrder}
                isActive={sortColumn === SortColumn.EMAIL}
              />
            }
            onClick={() => handleSortClick(SortColumn.EMAIL)}
          />
        </div>

        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {isLoading ? (
        <div className="flex gap-2 text-lg font-medium mt-10 justify-center">
          Populating Data{" "}
          <LoaderCircle className="w-5 h-auto text-primary animate-spin" />
        </div>
      ) : !currentComments || !paginatedComments ? (
        <div className="flex gap-2 text-lg font-medium mt-10 justify-center">
          No Data
        </div>
      ) : (
        <>
          <DataTable comments={paginatedComments} />

          <Pagination
            data={currentComments}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
          />
        </>
      )}
    </PageWrapper>
  );
};

export default Dashboard;
