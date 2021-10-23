import sys
from dataclasses import dataclass

@dataclass
class SpotNode:
    spotNo: str                 #Spot Number
    distances: 'dict[str: int]'         #Dictionary of distances




##def occupied(node: SpotNode) -> bool:
##    #Access database and return True if spot is available, False if not.
##    print(node.id)
##    return bool(sys.stdin.readline())



if __name__ == "__main__":

    try:
        last_assigned_spot = sys.argv[1] #Get last assigned spot from database

        ParkingSpots = json.loads(sys.argv[2])   #Get parking spot list

        #Car park is empty
        if last_assigned_spot == "Nothing":
            print("A001")
        else:
            #Initialize the graph
            with open("algorithms/spots.json") as spotsFile:
                
                json_obj = json.load(spotsFile)

                Spots = [SpotNode(**json_obj[i]) for i in range(len(json_obj))]

                for spot in Spots:
                    if(spot.spotNo == last_assigned_spot):
                        last_assigned = Spots.index(spot) #Get spot index corresponding to the spot from the json file


                available = dict((k,v) for k,v in Spots[last_assigned].distances.items() if ParkingSpots[int(k)]["state"]=="Not Occupied")

                try:
                    nextSpotNode = Spots[int(max(available))]
                    print(nextSpotNode.spotNo, end="")
                except ValueError:
                    print("Car Park is full")
    except Exception as e:
        print(e)
