import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Button,
  TextField,
  Box,
  debounce,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { useTableContext } from "../contexts/TableContext";

export interface Item {
  id: string;
  title: string;
  agreed: boolean;
  type: string;
}

interface PaginatedTableProps {
  items?: Item[];
  searchable?: boolean;
}

/**
 * PaginatedTable component renders a table with pagination and CRUD operations.
 * The data is managed using React Query and a context for state management.
 * @component
 */
const PaginatedTable: React.FC<PaginatedTableProps> = ({
  items: propItems,
}) => {
  const {
    items: contextItems,
    total,
    page,
    pageSize,
    setPage,
    setPageSize,
    search,
    setSearch,
    addItem,
    updateItem,
    deleteItem,
  } = useTableContext();
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Partial<Item> | null>(null);
  const { t } = useTranslation();

  const items = propItems || contextItems;

  // Debounced search function to limit the number of API calls
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setSearch(searchTerm);
    }, 120),
    []
  );

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleAddItem = () => {
    const newItem: Item = {
      id: uuidv4(),
      title: `New Item ${items.length + 1}`,
      agreed: false,
      type: "Type A",
    };
    addItem(newItem);
  };

  const handleEditItem = (id: string) => {
    const item = items.find((item) => item.id === id);
    setEditingItem(item || null);
  };

  const handleUpdateItem = () => {
    if (editingItem && editingItem.id) {
      updateItem(editingItem.id, editingItem);
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id: string) => {
    deleteItem(id);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label={t("search")}
          defaultValue={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            debouncedSearch(e.target.value)
          }
        />
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          {t("addItem")}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("id")}</TableCell>
              <TableCell>{t("title")}</TableCell>
              <TableCell>{t("agreed")}</TableCell>
              <TableCell>{t("type")}</TableCell>
              <TableCell>{t("actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {editingItem?.id === item.id ? (
                    <TextField
                      value={editingItem.title || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          title: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.title
                  )}
                </TableCell>
                <TableCell>{item.agreed ? t("yes") : t("no")}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditItem(item.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteItem(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value, 10))}
        labelRowsPerPage={t("rowsPerPage")}
      />
      {editingItem && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateItem}
          >
            {t("save")}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setEditingItem(null)}
          >
            {t("cancel")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PaginatedTable;
