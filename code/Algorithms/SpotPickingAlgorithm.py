#First draw the graph (let's consider the generic tree to be an undirected graph with no loops)
#Store as an adjacency list and do a BFS and find the minimum distance among all nodes(Count the number of edges)
#Store that information in an array of [spot,dictionary]-arrays

import queue
 
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
    #Initialize graph
    n = 11
    edges = [[] for i in range(n)] #Array of arrays
    
    
    addEdge(edges, 0, 1)
    addEdge(edges, 0, 2)
    addEdge(edges, 1, 3)
    addEdge(edges, 1, 4)
    addEdge(edges, 1, 5)
    addEdge(edges, 2, 6)
    addEdge(edges, 2, 7)
    addEdge(edges, 2, 8)
    addEdge(edges, 6, 9)
    addEdge(edges, 6, 10)

    #The parking spots
    spots = [3,4,5,7,8,9,10] #Not all nodes are parking spots
    #Array of dictionaries
    arr_of_dicts = []
    # [[spot1, dict1], [spot2, dict2], [spot3, dict3]]
    
    
    for i in spots:
        node = dict()
        for j in spots:
            if(i != j):
                node[j] =  minEdgeBFS(edges, i, j, n)
        arr_of_dicts.append([i, node])
                

    print("Array of [spot,dictionary]: ", arr_of_dicts)

    ######################################################################################
    #PART2
    #To find the next parking spot
    #The actual values should be retreived from the database
    #Spots and their status
    status = {3:0,4:1,5:1,7:1,8:1,9:0,10:0} #1-->Available, 0-->Occupied
    last_res = 3 #Last occupied spot
    next_spot = 0

    for spot in arr_of_dicts:
        if(spot[0]==last_res):
            dict_copy = spot[1]
            furthest_spot = max(dict_copy, key=dict_copy.get) #Find the furthest spot from the dictionary
            while(status[furthest_spot] == 0):
                dict_copy.pop(furthest_spot)
                furthest_spot = max(dict_copy, key=dict_copy.get) #Look for the next furthest
                
                
            print("Next spot:",furthest_spot)    

    
    

    
    
                

   
