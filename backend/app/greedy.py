import heapq

try:
    from app.graph import graph
    from app.heuristic import heuristic
except (ModuleNotFoundError, ImportError):
    from graph import graph
    from heuristic import heuristic

def greedy(start, goal):
    priority_queue = []
    heapq.heappush(priority_queue, (heuristic[start], start, [start]))

    visited = set()

    while priority_queue:
        h, current_city, path = heapq.heappop(priority_queue)

        if current_city == goal:
            return path

        if current_city in visited:
            continue

        visited.add(current_city)

        for neighbor in graph[current_city]:
            if neighbor not in visited:
                heapq.heappush(
                    priority_queue,
                    (heuristic[neighbor], neighbor, path + [neighbor])
                )

    return None


# Test run
if __name__ == "__main__":
    start = "Debre Birhan"
    goal = "Bahir Dar"

    path = greedy(start, goal)
    print("Path found:", path)