import { v4 as uuidv4 } from 'uuid';

interface Item {
  id: string;
  title: string;
  agreed: boolean;
  type: string;
}

const mockData: Item[] = Array.from({ length: 100 }, (_, index) => ({
  id: uuidv4(),
  title: `Item ${index + 1}`,
  agreed: Math.random() > 0.5,
  type: ['Type A', 'Type B', 'Type C'][Math.floor(Math.random() * 3)],
}));

/**
 * Fetches items from the mock data with pagination and optional search query.
 * @param {Object} params - The query parameters.
 * @param {number} params.page - The current page.
 * @param {number} params.pageSize - The size of each page.
 * @param {string} [params.search] - The optional search query.
 * @returns {Promise<{data: Item[], total: number}>} The paginated and filtered items.
 */
export const fetchItems = async ({
  page = 0,
  pageSize = 10,
  search = '',
}: {
  page: number;
  pageSize: number;
  search?: string;
}) => {
  const filteredItems = search
    ? mockData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : mockData;

  const start = page * pageSize;
  const end = start + pageSize;
  return {
    data: filteredItems.slice(start, end),
    total: filteredItems.length,
  };
};

/**
 * Adds a new item to the mock data.
 * @param {Item} item - The item to add.
 * @returns {Promise<Item>} The added item.
 */
export const addItem = async (item: Item) => {
  mockData.push(item);
  return item;
};

/**
 * Updates an existing item in the mock data.
 * @param {string} id - The id of the item to update.
 * @param {Partial<Item>} updatedItem - The updated item data.
 * @returns {Promise<Item>} The updated item.
 * @throws {Error} If the item is not found.
 */
export const updateItem = async (id: string, updatedItem: Partial<Item>) => {
  const index = mockData.findIndex((item) => item.id === id);
  if (index === -1) throw new Error('Item not found');
  mockData[index] = { ...mockData[index], ...updatedItem };
  return mockData[index];
};

/**
 * Deletes an item from the mock data.
 * @param {string} id - The id of the item to delete.
 * @returns {Promise<Item>} The deleted item.
 * @throws {Error} If the item is not found.
 */
export const deleteItem = async (id: string) => {
  const index = mockData.findIndex((item) => item.id === id);
  if (index === -1) throw new Error('Item not found');
  const deletedItem = mockData.splice(index, 1)[0];
  return deletedItem;
};
