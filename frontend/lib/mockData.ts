import { Algorithm, GraphData, PathResponse } from "./types";

export const MOCK_GRAPH: GraphData = {
  "Debre Birhan": { "Addis Ababa": 130, Adama: 95, Dessie: 280 },
  "Addis Ababa": { "Debre Birhan": 130, "Debre Markos": 170, Adama: 100 },
  Adama: { "Debre Birhan": 95, "Addis Ababa": 100, "Shewa Robit": 115 },
  "Shewa Robit": { Adama: 115, "Finote Selam": 160 },
  "Finote Selam": { "Shewa Robit": 160, "Bahir Dar": 100 },
  "Debre Markos": { "Addis Ababa": 170, "Bahir Dar": 280, Injibara: 95 },
  Injibara: { "Debre Markos": 95, "Bahir Dar": 75 },
  Dessie: { "Debre Birhan": 280, Kombolcha: 25, Woldiya: 200 },
  Kombolcha: { Dessie: 25, Woldiya: 120 },
  Woldiya: { Dessie: 200, Kombolcha: 120, "Bahir Dar": 360 },
  "Bahir Dar": { "Debre Markos": 280, Injibara: 75, "Finote Selam": 100, Woldiya: 360 }
};

const MOCK_PATHS: Record<Algorithm, string[]> = {
  BFS: ["Debre Birhan", "Addis Ababa", "Debre Markos", "Bahir Dar"],
  UCS: ["Debre Birhan", "Adama", "Shewa Robit", "Finote Selam", "Bahir Dar"],
  GREEDY: ["Debre Birhan", "Dessie", "Kombolcha", "Woldiya", "Bahir Dar"],
  ASTAR: ["Debre Birhan", "Addis Ababa", "Debre Markos", "Injibara", "Bahir Dar"]
};

export const calculatePathCost = (path: string[], graph: GraphData): number => {
  if (path.length < 2) {
    return 0;
  }

  let total = 0;
  for (let i = 0; i < path.length - 1; i += 1) {
    total += graph[path[i]]?.[path[i + 1]] ?? 0;
  }
  return total;
};

export const getMockPath = (
  algorithm: Algorithm,
  start: string,
  goal: string
): PathResponse => {
  const path = MOCK_PATHS[algorithm] ?? [];
  return {
    algorithm,
    start,
    goal,
    path,
    cost: calculatePathCost(path, MOCK_GRAPH)
  };
};
