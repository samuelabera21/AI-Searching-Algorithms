from collections import deque
from graph import graph

def bfs(start, goal):
    queue = deque()
    queue.append((start, [start]))  # (current_city, path)

    visited = set()

    while queue:
        current_city, path = queue.popleft()

        if current_city == goal:
            return path

        visited.add(current_city)

        for neighbor in graph[current_city]:
            if neighbor not in visited:
                queue.append((neighbor, path + [neighbor]))

    return None


# Test run
if __name__ == "__main__":
    start = "Debre Birhan"
    goal = "Bahir Dar"

    path = bfs(start, goal)
    print("Path found:", path)