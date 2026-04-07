# Route Planner AI

Route Planner AI is an educational project that compares classic graph search algorithms on an Ethiopian city map.

It includes:

- A Python backend with BFS, UCS, Greedy Best-First, and A* implementations
- A FastAPI API to query graph data and computed paths
- A Next.js frontend to visualize cities, roads, and selected routes

## Algorithms Included

- BFS (Breadth-First Search): minimizes hops (number of edges)
- UCS (Uniform Cost Search): minimizes total path cost
- Greedy Best-First Search: chooses based on heuristic only
- A* Search: combines path cost + heuristic for optimal informed search

## Project Structure

```text
route-planner-ai/
	backend/
		api/main.py          # FastAPI entrypoint
		app/                 # search algorithms, graph, heuristics
		requirements.txt
	frontend/
		app/                 # Next.js app router pages
		components/          # React components (graph visualizer)
		lib/                 # API client, types, mock data
	*.py                   # optional standalone algorithm scripts
```

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm

## Quick Start

From the `route-planner-ai` folder, run backend and frontend in separate terminals.

### 1) Start Backend (FastAPI)

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

Install dependencies and run server:

```bash
pip install -r requirements.txt
uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

Backend endpoints:

- API docs: http://127.0.0.1:8000/docs
- Graph: `GET /graph`
- Path: `GET /path?algorithm=UCS&start=Debre%20Birhan&goal=Bahir%20Dar`

### 2) Start Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:3000

## API Reference

### GET `/graph`

Returns full graph adjacency data.

Example response:

```json
{
	"graph": {
		"Addis Ababa": {
			"Debre Birhan": 130
		}
	}
}
```

### GET `/path`

Query parameters:

- `algorithm`: `BFS`, `UCS`, `GREEDY`, `ASTAR` (also accepts `A*` and `A_STAR`)
- `start`: start city
- `goal`: goal city

Example:

```text
/path?algorithm=ASTAR&start=Debre%20Birhan&goal=Bahir%20Dar
```

Success response shape:

```json
{
	"algorithm": "ASTAR",
	"start": "Debre Birhan",
	"goal": "Bahir Dar",
	"path": ["Debre Birhan", "Addis Ababa", "Debre Markos", "Bahir Dar"],
	"cost": 0
}
```

Error cases:

- `400` unknown city or unsupported algorithm
- `404` no path found

## Running Algorithms Directly (Python)

If you want to test algorithms without API/frontend:

```bash
cd backend/app
python bfs.py
python ucs.py
python greedy.py
python astar.py
```

To run combined checks (if present in script main block):

```bash
python graph.py
```

## Frontend Notes

- Frontend calls `http://127.0.0.1:8000` by default
- If backend is unavailable, frontend falls back to mock data

To override backend URL, create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000
```

## Troubleshooting

- Python not found: activate the virtual environment and retry
- `ModuleNotFoundError`: run algorithm files from `backend/app`
- CORS/API issues: ensure backend is running on `127.0.0.1:8000`
- Frontend path not updating: verify query params `algorithm`, `start`, `goal`

## Tech Stack

- Backend: FastAPI, Python
- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS, React Flow (`@xyflow/react`)
