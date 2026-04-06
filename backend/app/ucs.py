import heapq

try:
    from app.graph import graph
except (ModuleNotFoundError, ImportError):
    from graph import graph

def ucs(start, goal):
    priority_queue = []
    heapq.heappush(priority_queue, (0, start, [start]))  
    # (cost, current_city, path)

    visited = set()

    while priority_queue:
        cost, current_city, path = heapq.heappop(priority_queue)

        if current_city == goal:
            return path, cost

        if current_city in visited:
            continue

        visited.add(current_city)

        for neighbor, distance in graph[current_city].items():
            if neighbor not in visited:
                heapq.heappush(
                    priority_queue,
                    (cost + distance, neighbor, path + [neighbor])
                )

    return None, float("inf")


# Test run
if __name__ == "__main__":
    start = "Debre Birhan"
    goal = "Bahir Dar"

    path, cost = ucs(start, goal)
    print("Path found:", path)
    print("Total cost:", cost, "km")