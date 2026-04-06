import { Algorithm, GraphResponse, PathResponse } from "./types";
import { getMockPath, MOCK_GRAPH } from "./mockData";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

export const fetchGraph = async (): Promise<GraphResponse> => {
  try {
    const response = await fetch(`${API_BASE}/graph`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Graph request failed: ${response.status}`);
    }

    return (await response.json()) as GraphResponse;
  } catch {
    return { graph: MOCK_GRAPH };
  }
};

export const fetchPath = async (
  algorithm: Algorithm,
  start: string,
  goal: string
): Promise<PathResponse> => {
  try {
    const url = new URL(`${API_BASE}/path`);
    url.searchParams.set("algorithm", algorithm);
    url.searchParams.set("start", start);
    url.searchParams.set("goal", goal);

    const response = await fetch(url.toString(), {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Path request failed: ${response.status}`);
    }

    const result = (await response.json()) as PathResponse;
    return {
      algorithm,
      start,
      goal,
      path: result.path ?? [],
      cost: result.cost ?? 0
    };
  } catch {
    return getMockPath(algorithm, start, goal);
  }
};
