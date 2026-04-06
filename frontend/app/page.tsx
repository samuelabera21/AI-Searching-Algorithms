"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import GraphVisualizer from "@/components/GraphVisualizer";
import { fetchGraph, fetchPath } from "@/lib/api";
import { calculatePathCost } from "@/lib/mockData";
import { Algorithm, GraphData } from "@/lib/types";

const ALGORITHMS: Algorithm[] = ["BFS", "UCS", "GREEDY", "ASTAR"];
const START_CITY = "Debre Birhan";
const GOAL_CITY = "Bahir Dar";

export default function HomePage() {
  const [graphData, setGraphData] = useState<GraphData>({});
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>("UCS");
  const [path, setPath] = useState<string[]>([]);
  const [cost, setCost] = useState<number>(0);
  const [loadingGraph, setLoadingGraph] = useState(true);
  const [loadingPath, setLoadingPath] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadGraph = async () => {
      setLoadingGraph(true);
      setError(null);

      try {
        const result = await fetchGraph();
        if (mounted) {
          setGraphData(result.graph);
        }
      } catch {
        if (mounted) {
          setError("Failed to load graph data.");
        }
      } finally {
        if (mounted) {
          setLoadingGraph(false);
        }
      }
    };

    loadGraph();

    return () => {
      mounted = false;
    };
  }, []);

  const handleComputePath = async () => {
    setLoadingPath(true);
    setError(null);

    try {
      const result = await fetchPath(selectedAlgorithm, START_CITY, GOAL_CITY);
      setPath(result.path);
      setCost(result.cost ?? calculatePathCost(result.path, graphData));
    } catch {
      setError("Could not compute path. Check backend or try again.");
    } finally {
      setLoadingPath(false);
    }
  };

  const handleReset = () => {
    setPath([]);
    setCost(0);
    setError(null);
  };

  const routeSummary = useMemo(() => {
    if (!path.length) {
      return "No path selected yet.";
    }
    return path.join(" -> ");
  }, [path]);

  const pathSegments = useMemo(() => {
    if (path.length < 2) {
      return [] as Array<{ from: string; to: string; distance: number }>;
    }

    const segments: Array<{ from: string; to: string; distance: number }> = [];

    for (let i = 0; i < path.length - 1; i += 1) {
      const from = path[i];
      const to = path[i + 1];
      const distance = graphData[from]?.[to] ?? 0;
      segments.push({ from, to, distance });
    }

    return segments;
  }, [path, graphData]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1300px] flex-col gap-6 px-4 py-6 md:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-xl backdrop-blur-sm md:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Route Planner AI</p>
            <h1 className="mt-1 text-3xl font-bold text-ink md:text-4xl">
              Ethiopian Graph Search Explorer
            </h1>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Compare BFS, UCS, Greedy, and A* from Debre Birhan to Bahir Dar with animated
              routes.
            </p>
          </div>

          <div className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm">
            <p>
              <span className="font-semibold">Start:</span> {START_CITY}
            </p>
            <p>
              <span className="font-semibold">Goal:</span> {GOAL_CITY}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <select
            value={selectedAlgorithm}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setSelectedAlgorithm(event.target.value as Algorithm)
            }
            className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-lake focus:ring-2 focus:ring-lake/35"
          >
            {ALGORITHMS.map((algorithm) => (
              <option key={algorithm} value={algorithm}>
                {algorithm}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleComputePath}
            disabled={loadingGraph || loadingPath}
            className="h-12 rounded-xl bg-lake px-6 text-sm font-bold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingPath ? "Computing..." : "Compute Path"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="h-12 rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Reset
          </button>
        </div>

        <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <p className="font-semibold text-amber-900">Route</p>
            <p className="mt-1 text-amber-800">{routeSummary}</p>
          </div>

          <div className="rounded-xl border border-teal-200 bg-teal-50 p-3">
            <p className="font-semibold text-teal-900">Distance</p>
            <p className="mt-1 text-teal-800">
              {path.length ? `${cost} km` : "Run an algorithm to see cost"}
            </p>
          </div>
        </div>

        {pathSegments.length ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-800">Path segments</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {pathSegments.map((segment, index) => (
                <span
                  key={`${segment.from}-${segment.to}-${index}`}
                  className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900"
                >
                  {index + 1}. {segment.from}{" -> "}{segment.to} ({segment.distance} km)
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {error ? <p className="mt-3 text-sm font-semibold text-red-600">{error}</p> : null}
      </section>

      <section className="flex-1">
        {loadingGraph ? (
          <div className="grid h-[68vh] min-h-[520px] place-items-center rounded-3xl border border-slate-200 bg-white/70 text-slate-500 shadow-xl">
            Loading graph...
          </div>
        ) : (
          <GraphVisualizer
            graphData={graphData}
            path={path}
            start={START_CITY}
            goal={GOAL_CITY}
          />
        )}
      </section>
    </main>
  );
}
