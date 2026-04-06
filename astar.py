import heapq
from graph import graph
from heuristic import heuristic

def astar(start, goal):
    priority_queue = []
    heapq.heappush(priority_queue, (0, start, [start], 0))
    # (f, current_city, path, g)

    visited = set()

    while priority_queue:
        f, current_city, path, g = heapq.heappop(priority_queue)

        if current_city == goal:
            return path, g

        if current_city in visited:
            continue

        visited.add(current_city)

        for neighbor, distance in graph[current_city].items():
            if neighbor not in visited:
                new_g = g + distance
                new_f = new_g + heuristic[neighbor]

                heapq.heappush(
                    priority_queue,
                    (new_f, neighbor, path + [neighbor], new_g)
                )

    return None, float("inf")


# Test run
if __name__ == "__main__":
    start = "Debre Birhan"
    goal = "Bahir Dar"

    path, cost = astar(start, goal)
    print("Path found:", path)
    print("Total cost:", cost, "km")