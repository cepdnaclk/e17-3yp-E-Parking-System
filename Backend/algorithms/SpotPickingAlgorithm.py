#First draw the graph (let's consider the generic tree to be an undirected graph with no loops)
#Store as an adjacency list and do a BFS and find the minimum distance among all nodes(Count the number of edges)
#Store that information in an array of [spot,dictionary]-arrays

import queue, json
 
# Function for finding minimum no. of edges using BFS
def minEdgeBFS(edges, u, v, n):
     
    # visited[n] for keeping track
    # of visited node in BFS
    visited = [0] * n
 
    # Initialize distances as 0
    distance = [0] * n
 
    # queue to do BFS.
    Q = queue.Queue()
    distance[u] = 0
 
    Q.put(u)
    visited[u] = True
    while (not Q.empty()):
        x = Q.get()
         
        for i in range(len(edges[x])):
            if (visited[edges[x][i]]):
                continue
 
            # update distance for i
            distance[edges[x][i]] = distance[x] + 1
            Q.put(edges[x][i])
            visited[edges[x][i]] = 1
    return distance[v]
 
# Function for addition of edge
def addEdge(edges, u, v):
    edges[u].append(v)
    edges[v].append(u)


def getSpotNo(i):
    i -= 18
    if i < 11:
        return 'A' + f'{i:03}'
    elif i < 21:
        return 'B' + f'{(i-10):03}'
    else:
        return 'C' + f'{(i-20):03}'
    
 
# Main function
if __name__ == '__main__':
 
    # To store the adjacency list of graph
    #             0
    #            / \ 
    #         1       2
    #       / / \   / \ \
    #      3 4   5 6   7 8
    #             / \
    #            9  10
    #
    #
    ######################################################################################
    #PART1
    #Initialize graph - Run this only once
    n = 47
    edges = [[] for i in range(n)] #Array of arrays
    
    
    addEdge(edges, 0, 1)
    
    addEdge(edges, 1, 19)
    addEdge(edges, 1, 25)
    addEdge(edges, 1, 2)
    
    addEdge(edges, 2, 20)
    addEdge(edges, 2, 26)
    addEdge(edges, 2, 3)
    
    addEdge(edges, 3, 21)
    addEdge(edges, 3, 27)
    addEdge(edges, 3, 4)
    
    addEdge(edges, 4, 22)
    addEdge(edges, 4, 28)
    addEdge(edges, 4, 5)
    
    addEdge(edges, 5, 23)
    addEdge(edges, 5, 6)
    
    addEdge(edges, 6, 24)
    addEdge(edges, 6, 7)
    
    addEdge(edges, 7, 8)
    
    addEdge(edges, 8, 29)
    addEdge(edges, 8, 35)
    addEdge(edges, 8, 9)

    addEdge(edges, 9, 30)
    addEdge(edges, 9, 36)
    addEdge(edges, 9, 10)

    addEdge(edges, 10, 31)
    addEdge(edges, 10, 37)
    addEdge(edges, 10, 11)

    addEdge(edges, 11, 32)
    addEdge(edges, 11, 38)
    addEdge(edges, 11, 12)

    addEdge(edges, 12, 33)
    addEdge(edges, 12, 13)

    addEdge(edges, 13, 34)
    addEdge(edges, 13, 14)

    addEdge(edges, 14, 15)

    addEdge(edges, 15, 39)
    addEdge(edges, 15, 43)
    addEdge(edges, 15, 16)

    addEdge(edges, 16, 40)
    addEdge(edges, 16, 44)
    addEdge(edges, 16, 17)

    addEdge(edges, 17, 41)
    addEdge(edges, 17, 45)
    addEdge(edges, 17, 18)

    addEdge(edges, 18, 42)
    addEdge(edges, 18, 46)

    
    #The parking spots
    spots = [0]
    for i in range(19,47):
        spots.append(i)
    print(spots)
    #Array of dictionaries
    arr_of_dicts = []
    # [[spot1, dict1], [spot2, dict2], [spot3, dict3]]
    
    
    for i in spots:
        node = dict()
        for j in spots:
            if(i != j):
                node[str(j-18)] =  minEdgeBFS(edges, i, j, n)
        arr_of_dicts.append({'spotNo': getSpotNo(i), "distances":node})
                

    print(json.dumps(arr_of_dicts, indent=4))
    
    #print("Array of [spot,dictionary]: ", arr_of_dicts)



    ######################################################################################
    #PART2
    #To find the next parking spot
    #The actual values should be retreived from the database
    
    #Spots and their status
##    status = {3:0,4:1,5:1,7:1,8:1,9:0,10:0} #1-->Available, 0-->Occupied
##    last_res = 3 #Last occupied spot
##    
##
##    for spot in arr_of_dicts:
##        if(spot[0]==last_res):
##            dict_copy = spot[1]
##            if(max(status.values())== 0): #Parking lot is full
##                print("Parking lot is full")
##                break
##            
##            else: #Parking lot is not full
##                
##                furthest_spot = max(dict_copy, key=dict_copy.get) #Find the furthest spot from the dictionary
##                while(status[furthest_spot] == 0 and len(dict_copy) > 0):
##                    dict_copy.pop(furthest_spot)
##                    furthest_spot = max(dict_copy, key=dict_copy.get) #Look for the next furthest
##                        
##
##                print("Next spot:",furthest_spot)
                    
                



            
            
                
                
                
            
            

    
    

    
    
                

   
