import json, sys
from dataclasses import dataclass

@dataclass
class SpotNode:
    id: int         #DON'T NEED THIS!
    spotNo: str                 #Spot Number
    status: bool                #True: Available, False: Not Available (DON'T NEED THIS!)
    adjacent: list[int]         #List of nodes adjacent to the node
    distances: dict[str: int]         #Dictionary of distances




##def occupied(node: SpotNode) -> bool:
##    #Access database and return True if spot is available, False if not.
##    print(node.id)
##    return bool(sys.stdin.readline())



if __name__ == "__main__":

    

    last_assigned = int(sys.argv[1]) #Get last assigned spot from database

    ParkingSpots = list(sys.argv[2])    #Get parking spot list
    

    #Initialize the graph
    with open("spots.json") as spotsFile:
        json_obj = json.load(spotsFile)

        Spots = [SpotNode(**json_obj[i]) for i in range(len(json_obj))]

        available = dict((k,v) for k,v in Spots[last_assigned].distances.items() if ParkingSpots[int(k)].state=="Not Occupied")

        try:
            nextSpot = Spots[int(max(available))]
            print(nextSpot)
        except ValueError:
            print("Car Park is full")
