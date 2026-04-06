from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

import sys
from pathlib import Path

app_dir = Path(__file__).resolve().parents[1] / "app"
if str(app_dir) not in sys.path:
	sys.path.insert(0, str(app_dir))

from astar import astar
from bfs import bfs
from graph import graph, path_cost
from greedy import greedy
from ucs import ucs

app = FastAPI(title="Route Planner AI API", version="1.0.0")

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


def _validate_cities(start: str, goal: str) -> None:
	if start not in graph:
		raise HTTPException(status_code=400, detail=f"Unknown start city: {start}")
	if goal not in graph:
		raise HTTPException(status_code=400, detail=f"Unknown goal city: {goal}")


@app.get("/graph")
def get_graph():
	return {"graph": graph}


@app.get("/path")
def get_path(
	algorithm: str = Query(..., description="BFS, UCS, GREEDY, or ASTAR"),
	start: str = Query(...),
	goal: str = Query(...),
):
	_validate_cities(start, goal)

	algo = algorithm.strip().upper()

	if algo == "BFS":
		path = bfs(start, goal)
		if not path:
			raise HTTPException(status_code=404, detail="No path found")
		cost = path_cost(path)
	elif algo == "UCS":
		path, cost = ucs(start, goal)
		if not path:
			raise HTTPException(status_code=404, detail="No path found")
	elif algo == "GREEDY":
		path = greedy(start, goal)
		if not path:
			raise HTTPException(status_code=404, detail="No path found")
		cost = path_cost(path)
	elif algo in {"ASTAR", "A*", "A_STAR"}:
		path, cost = astar(start, goal)
		if not path:
			raise HTTPException(status_code=404, detail="No path found")
		algo = "ASTAR"
	else:
		raise HTTPException(status_code=400, detail="Unsupported algorithm")

	return {
		"algorithm": algo,
		"start": start,
		"goal": goal,
		"path": path,
		"cost": cost,
	}
