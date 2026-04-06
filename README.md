# Route Planner AI (Ethiopia)

This project demonstrates four search algorithms on a city graph:

- BFS (Breadth-First Search)
- UCS (Uniform Cost Search)
- Greedy Best-First Search
- A* Search

The current graph is designed so each algorithm can behave differently for the route:

- Start: Debre Birhan
- Goal: Bahir Dar

## Project Structure

- frontend/
- backend/
	- api/main.py
	- app/graph.py
	- app/heuristic.py
	- app/bfs.py
	- app/ucs.py
	- app/greedy.py
	- app/astar.py

## Prerequisites

- Python 3.10+ (recommended: use the workspace virtual environment)
- Windows PowerShell or Git Bash terminal

## Setup

Run these commands from the project root (route-planner-ai):

```bash
cd backend
python -m venv .venv
```

Activate virtual environment:

```bash
# PowerShell
.venv\Scripts\Activate.ps1

# Git Bash
source .venv/Scripts/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

## Run Each Algorithm Separately

Move to the app folder first:

```bash
cd backend/app
```

### 1) BFS

```bash
python bfs.py
```

Expected output style:

```text
Path found: ['Debre Birhan', 'Addis Ababa', 'Debre Markos', 'Bahir Dar']
```

Notes:

- BFS minimizes number of steps (edges), not total distance.

### 2) UCS

```bash
python ucs.py
```

Expected output style:

```text
Path found: [...]
Total cost: ... km
```

Notes:

- UCS minimizes total travel distance.

### 3) Greedy

```bash
python greedy.py
```

Expected output style:

```text
Path found: [...]
```

Notes:

- Greedy chooses the next city with the lowest heuristic value.
- It can be fast but may return a non-optimal route.

### 4) A*

```bash
python astar.py
```

Expected output style:

```text
Path found: [...]
Total cost: ... km
```

Notes:

- A* uses both actual cost (g) and heuristic estimate (h).
- In this graph, A* should find an optimal-cost route.

## Run All Algorithms in One Command

The file backend/app/graph.py contains a test section that runs BFS, UCS, Greedy, and A* together.

From backend/app:

```bash
python graph.py
```

You should see all four paths and their costs printed (where applicable).

## Why Results Differ

- BFS: shortest number of hops.
- UCS: lowest sum of distances.
- Greedy: follows heuristic only, can be misled.
- A*: balances cost-so-far plus heuristic.

This is intentional and useful for understanding algorithm behavior.

## Troubleshooting

If python is not recognized, use full interpreter path from your virtual environment, for example:

```bash
"s:/Learn/Thrid Year Second Semister/Thrid Year Second Semister/AI/project/Search/.venv/Scripts/python.exe" bfs.py
```

If you get ModuleNotFoundError:

- Ensure you are inside backend/app when running bfs.py, ucs.py, greedy.py, astar.py, or graph.py.
- Ensure graph.py and heuristic.py are in the same folder.

If outputs do not match expected behavior:

- Confirm you are using the updated files:
	- backend/app/graph.py
	- backend/app/heuristic.py

## Backend API (for Frontend Integration)

The frontend calls these endpoints:

- GET /graph
- GET /path?algorithm=UCS&start=Debre Birhan&goal=Bahir Dar

### Start FastAPI server

From project root:

```bash
cd backend
pip install -r requirements.txt
uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

API docs will be available at:

- http://127.0.0.1:8000/docs

## Frontend (Next.js + Tailwind + React Flow)

The frontend source is in frontend/ and includes:

- app/page.tsx
- components/GraphVisualizer.tsx
- lib/api.ts
- lib/mockData.ts

### Install and run frontend

From project root:

```bash
cd frontend
npm install
npm run dev
```

Open:

- http://localhost:3000

### Frontend Features

- City graph visualization (nodes and edges)
- Start/goal highlighted and animated
- Algorithm dropdown (BFS, UCS, GREEDY, ASTAR)
- Compute Path button
- Reset button
- Highlighted path with animated traversal on selected route
- Edge distance labels and node tooltips
- Responsive layout

### Backend URL Configuration (optional)

By default, frontend calls:

- http://127.0.0.1:8000

To change API base URL, create frontend/.env.local:

```bash
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000
```

### Mock Data Fallback

If backend is not running, frontend automatically uses mock graph and route data from:

- frontend/lib/mockData.ts
