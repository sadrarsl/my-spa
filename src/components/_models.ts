import { v4 as uuidv4 } from "uuid";

export interface Item {
  id: string;
  title: string;
  agreed: boolean;
  type: string;
}

/**
 * Generates an array of mock items.
 * @param {number} count - The number of items to generate.
 * @returns {Item[]} An array of mock items.
 */
export const generateMockData = (count: number = 100): Item[] => {
  const types = ["Type A", "Type B", "Type C"];
  const items: Item[] = [];

  for (let i = 1; i <= count; i++) {
    items.push({
      id: uuidv4(),
      title: `Item ${i}`,
      agreed: Math.random() > 0.5,
      type: types[i % types.length],
    });
  }

  return items;
};
