
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { fetchItems, addItem, updateItem, deleteItem } from "../services/api";
import { Item } from "../components/models";

interface TableContextType {
  items: Item[];
  total: number;
  page: number;
  pageSize: number;
  search: string;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearch: (search: string) => void;
  addItem: (item: Item) => void;
  updateItem: (id: string, updatedItem: Partial<Item>) => void;
  deleteItem: (id: string) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};

/**
 * TableProvider component that provides table state and actions to its children.
 * @param {Object} props - The props for the TableProvider.
 * @param {ReactNode} props.children - The children components.
 * @returns {JSX.Element} The TableProvider component.
 */
const TableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["items", { page, pageSize, search }],
    queryFn: () => fetchItems({ page, pageSize, search }),
  });

  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({
      id,
      updatedItem,
    }: {
      id: string;
      updatedItem: Partial<Item>;
    }) => updateItem(id, updatedItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const searchMutation = useMutation({
    mutationFn: fetchItems,
    onSuccess: (data) => {
      queryClient.setQueryData(["items", { page, pageSize, search }], data);
    },
  });

  useEffect(() => {
    searchMutation.mutate({ page, pageSize, search });
  }, [page, pageSize, search]);

  const contextValue: TableContextType = {
    items: data?.data || [],
    total: data?.total || 0,
    page,
    pageSize,
    search,
    setPage,
    setPageSize,
    setSearch,
    addItem: (item: Item) => addItemMutation.mutate(item),
    updateItem: (id: string, updatedItem: Partial<Item>) =>
      updateItemMutation.mutate({ id, updatedItem }),
    deleteItem: (id: string) => deleteItemMutation.mutate(id),
  };


  if (isError) return <div>Error loading data</div>;

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};

/**
 * TableContextProvider component that wraps the TableProvider with QueryClientProvider.
 * @param {Object} props - The props for the TableContextProvider.
 * @param {ReactNode} props.children - The children components.
 * @returns {JSX.Element} The TableContextProvider component.
 */
export const TableContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TableProvider>{children}</TableProvider>
    </QueryClientProvider>
  );
};

export default TableProvider;
