export type GraphData = Record<string, Record<string, number>>;

export type Algorithm = "BFS" | "UCS" | "GREEDY" | "ASTAR";

export interface GraphResponse {
  graph: GraphData;
}

export interface PathResponse {
  algorithm: Algorithm;
  start: string;
  goal: string;
  path: string[];
  cost: number;
}
