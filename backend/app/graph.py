graph = {
    "Debre Birhan": {
        "Addis Ababa": 130,
        "Adama": 95,
        "Dessie": 280
    },
    "Addis Ababa": {
        "Debre Birhan": 130,
        "Debre Markos": 170,
        "Adama": 100
    },
    "Adama": {
        "Debre Birhan": 95,
        "Addis Ababa": 100,
        "Shewa Robit": 115
    },
    "Shewa Robit": {
        "Adama": 115,
        "Finote Selam": 160
    },
    "Finote Selam": {
        "Shewa Robit": 160,
        "Bahir Dar": 100
    },
    "Debre Markos": {
        "Addis Ababa": 170,
        "Bahir Dar": 280,
        "Injibara": 95
    },
    "Injibara": {
        "Debre Markos": 95,
        "Bahir Dar": 75
    },
    "Dessie": {
        "Debre Birhan": 280,
        "Kombolcha": 25,
        "Woldiya": 200
    },
    "Kombolcha": {
        "Dessie": 25,
        "Woldiya": 120
    },
    "Woldiya": {
        "Dessie": 200,
        "Kombolcha": 120,
        "Bahir Dar": 360
    },
    "Bahir Dar": {
        "Debre Markos": 280,
        "Injibara": 75,
        "Finote Selam": 100,
        "Woldiya": 360
    }
}


def path_cost(path):
    if not path or len(path) < 2:
        return 0
    total = 0
    for i in range(len(path) - 1):
        total += graph[path[i]][path[i + 1]]
    return total


# Test section
if __name__ == "__main__":
    from bfs import bfs
    from ucs import ucs
    from greedy import greedy
    from astar import astar

    start = "Debre Birhan"
    goal = "Bahir Dar"

    bfs_path = bfs(start, goal)
    ucs_path, ucs_cost = ucs(start, goal)
    greedy_path = greedy(start, goal)
    astar_path, astar_cost = astar(start, goal)

    print("BFS path:", bfs_path)
    print("BFS cost:", path_cost(bfs_path), "km")
    print()
    print("UCS path:", ucs_path)
    print("UCS cost:", ucs_cost, "km")
    print()
    print("Greedy path:", greedy_path)
    print("Greedy cost:", path_cost(greedy_path), "km")
    print()
    print("A* path:", astar_path)
    print("A* cost:", astar_cost, "km")