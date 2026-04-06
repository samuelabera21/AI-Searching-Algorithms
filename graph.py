graph = {
    "Debre Birhan": {
        "Addis Ababa": 130,
        "Dessie": 280
    },
    "Addis Ababa": {
        "Debre Birhan": 130,
        "Debre Markos": 300
    },
    "Debre Markos": {
        "Addis Ababa": 300,
        "Bahir Dar": 265
    },
    "Dessie": {
        "Debre Birhan": 280,
        "Kombolcha": 25
    },
    "Kombolcha": {
        "Dessie": 25,
        "Woldiya": 120
    },
    "Woldiya": {
        "Kombolcha": 120,
        "Bahir Dar": 360
    },
    "Bahir Dar": {
        "Debre Markos": 265,
        "Woldiya": 360
    }
}

# Test print
if __name__ == "__main__":
    print(graph["Debre Birhan"])