"use client";

import {
  Background,
  BaseEdge,
  Controls,
  Edge,
  EdgeProps,
  Handle,
  MarkerType,
  MiniMap,
  Node,
  NodeProps,
  Position,
  ReactFlow,
  getBezierPath
} from "@xyflow/react";
import { memo, useMemo } from "react";
import { GraphData } from "@/lib/types";

type GraphVisualizerProps = {
  graphData: GraphData;
  path: string[];
  start: string;
  goal: string;
};

type CityNodeData = {
  label: string;
  role: "start" | "goal" | "normal";
  step?: number;
};

type RoadEdgeData = {
  distance: number;
  highlighted: boolean;
};

type CityFlowNode = Node<CityNodeData, "cityNode">;
type RoadFlowEdge = Edge<RoadEdgeData, "roadEdge">;

const CITY_POSITIONS: Record<string, { x: number; y: number }> = {
  "Debre Birhan": { x: 80, y: 200 },
  "Addis Ababa": { x: 280, y: 290 },
  Adama: { x: 290, y: 70 },
  "Shewa Robit": { x: 470, y: 95 },
  "Finote Selam": { x: 660, y: 150 },
  "Debre Markos": { x: 470, y: 330 },
  Injibara: { x: 690, y: 350 },
  Dessie: { x: 250, y: 470 },
  Kombolcha: { x: 430, y: 500 },
  Woldiya: { x: 620, y: 470 },
  "Bahir Dar": { x: 875, y: 245 }
};

const CityNode = memo(({ data }: NodeProps<CityFlowNode>) => {
  const roleClass =
    data.role === "start"
      ? "border-lake bg-lake/10 text-lake"
      : data.role === "goal"
        ? "border-clay bg-clay/10 text-clay"
        : "border-slate-400 bg-white/90 text-slate-700";

  const pulseClass = data.role === "start" || data.role === "goal" ? "node-pulse" : "";
  const pathNodeClass = typeof data.step === "number" ? "ring-2 ring-amber-300" : "";

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ width: 8, height: 8, background: "#94a3b8", opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ width: 8, height: 8, background: "#94a3b8", opacity: 0 }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        style={{ width: 8, height: 8, background: "#94a3b8", opacity: 0 }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        style={{ width: 8, height: 8, background: "#94a3b8", opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={{ width: 8, height: 8, background: "#94a3b8", opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={{ width: 8, height: 8, background: "#94a3b8", opacity: 0 }}
      />
      <div
        className={`relative min-w-[130px] rounded-2xl border-2 px-3 py-2 text-center text-sm font-semibold shadow-lg backdrop-blur-sm ${roleClass} ${pulseClass} ${pathNodeClass}`}
        title={data.label}
      >
        {typeof data.step === "number" ? (
          <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-amber-500 text-xs font-bold text-white shadow-md">
            {data.step + 1}
          </span>
        ) : null}
        {data.label}
      </div>
    </>
  );
});
CityNode.displayName = "CityNode";

const RoadEdge = memo((props: EdgeProps<RoadFlowEdge>) => {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });

  const highlighted = Boolean(data?.highlighted);

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: highlighted ? "#f59e0b" : "#94a3b8",
          strokeWidth: highlighted ? 4.4 : 1.4,
          opacity: highlighted ? 1 : 0.24
        }}
        className={highlighted ? "path-animated" : ""}
      />

      <text
        x={labelX}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={highlighted ? "#7c2d12" : "#64748b"}
        fontSize={11}
        fontWeight={highlighted ? 700 : 500}
        opacity={highlighted ? 1 : 0.65}
      >
        {data?.distance} km
      </text>

      {highlighted ? (
        <circle r="4" fill="#f97316">
          <animateMotion dur="2.3s" repeatCount="indefinite" path={edgePath} />
        </circle>
      ) : null}
    </>
  );
});
RoadEdge.displayName = "RoadEdge";

const nodeTypes = {
  cityNode: CityNode
};

const edgeTypes = {
  roadEdge: RoadEdge
};

const makePathSet = (path: string[]) => {
  const set = new Set<string>();
  for (let i = 0; i < path.length - 1; i += 1) {
    const a = path[i];
    const b = path[i + 1];
    set.add(`${a}|${b}`);
    set.add(`${b}|${a}`);
  }
  return set;
};

export default function GraphVisualizer({ graphData, path, start, goal }: GraphVisualizerProps) {
  const pathSet = useMemo(() => makePathSet(path), [path]);
  const stepMap = useMemo(() => {
    const map = new Map<string, number>();
    path.forEach((city, index) => {
      if (!map.has(city)) {
        map.set(city, index);
      }
    });
    return map;
  }, [path]);

  const nodes = useMemo<CityFlowNode[]>(() => {
    const cityNames = Object.keys(graphData);

    return cityNames.map((city, index) => {
      const fallbackX = 120 + (index % 4) * 210;
      const fallbackY = 80 + Math.floor(index / 4) * 140;
      const position = CITY_POSITIONS[city] ?? { x: fallbackX, y: fallbackY };

      return {
        id: city,
        position,
        type: "cityNode",
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label: city,
          role: city === start ? "start" : city === goal ? "goal" : "normal",
          step: stepMap.get(city)
        }
      };
    });
  }, [graphData, start, goal, stepMap]);

  const edges = useMemo<RoadFlowEdge[]>(() => {
    const seen = new Set<string>();
    const list: RoadFlowEdge[] = [];

    for (const [source, neighbors] of Object.entries(graphData)) {
      for (const [target, distance] of Object.entries(neighbors)) {
        const pairKey = [source, target].sort().join("::");
        if (seen.has(pairKey)) {
          continue;
        }

        seen.add(pairKey);

        const isDirectDebreMarkosToBahirDar = pairKey === "Bahir Dar::Debre Markos";
        const isInjibaraToBahirDar = pairKey === "Bahir Dar::Injibara";

        list.push({
          id: `${source}--${target}`,
          source,
          target,
          type: "roadEdge",
          sourceHandle: isDirectDebreMarkosToBahirDar
            ? "top-source"
            : isInjibaraToBahirDar
              ? "bottom-source"
              : undefined,
          targetHandle: isDirectDebreMarkosToBahirDar
            ? "top-target"
            : isInjibaraToBahirDar
              ? "bottom-target"
              : undefined,
          data: {
            distance,
            highlighted: pathSet.has(`${source}|${target}`)
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: pathSet.has(`${source}|${target}`) ? "#f59e0b" : "#94a3b8",
            width: 18,
            height: 18
          }
        });
      }
    }

    return list;
  }, [graphData, pathSet]);

  return (
    <div className="h-[68vh] min-h-[520px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/75 shadow-2xl backdrop-blur-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.22 }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={22} size={1.2} color="#cbd5e1" />
        <MiniMap pannable zoomable />
        <Controls />
      </ReactFlow>
    </div>
  );
}
