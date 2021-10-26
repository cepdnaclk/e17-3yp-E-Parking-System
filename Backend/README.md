# REST API Endpoints
_____

## To get the number of spots assigned in a day
URL 			- 	https://quickpark.tk/api/assignto/getcountall
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	3
  
Success		-	Status code 200 + Number of assigned spots
  
Error			-	Status code 400 + Error
   
## To get the total daily income
URL 			- 	https://quickpark.tk/api/assignto/getdailycost
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	 36.1955
  
Success		-	Status code 200 + Total daily income
  
Error			-	Status code 400 + error

## To get the hourly income
URL 			- 	https://quickpark.tk/api/assignto/gethourlycost
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	1
  
Success		-	Status code 200 + Total hourly income
  
Error			-	Status code 400 + error

## To get the weekly count
URL 			- 	https://quickpark.tk/api/assignto/getweeklycount
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	 [
    {
        "Day": "Sunday",
        "count": 4
    },
    {
        "Day": "Monday",
        "count": 0
    },
    {
        "Day": "Tuesday",
        "count": 0
    },
    {
        "Day": "Wednesday",
        "count": 0
    },
    {
        "Day": "Thursday",
        "count": 0
    },
    {
        "Day": "Friday",
        "count": 0
    },
    {
        "Day": "Saturday",
        "count": 0
    }
]

Success		-	Status code 200 + Total weekly count of customers

Error			-	Status code 400 + error

## To assign a new spot (check-in)
URL 			- 	https://quickpark.tk/api/assignto/add
  
Method 		- 	POST
  
Auth required		-	Yes
  
Data			-	{
				     "vehiclenumber": [String of the license plate number],
       "checkin": [Checkin time as String]
}
  
Data example		-	{
    "vehiclenumber": "WP5529",
    "checkin": "17.51"
}
  
Success		-	Status code 200 OK
  
Error			-	Status code 400 + {success: false, error: "Please provide checkintime and vehiclenumber"},
				Status code 406 + {success: false, error: error.message},
				Status code 400 + {'Error: '+ err}
        
## To unassign a spot (check-out)
URL 			- 	https://quickpark.tk/api/assignto/exit
  
Method 		- 	POST
  
Auth required		-	Yes
  
Data			-	{
				     "vehiclenumber": [String of the license plate number],
       "checkout": [Checkout time as String]
}
  
Data example		-	{
				      "vehiclenumber": "AB5628",
        "checkout": "10:00"
}
  
Success		-	Status code 200 OK + “Done!!!”
  
Error			-	Status code 406 + {success: false, error: error.message}


## Update parking spot status
URL 			- 	https://quickpark.tk/api/assignto/parkingspotassign
  
Method 		- 	POST
  
Auth required		-	Yes
  
Data			-	{
    "spot": [spot id],
    "status": [status]
}
  
Data example		-	{
    "spot": "C004",
    "status": "Not Occupied"
}
  
Success		-	Status code 200 OK + “Done!!!”
  
Error			- Status code 406 + {success: false, error: "Error at spotnodes!!!"}

## To get guest customers by id
URL 			- 	https://quickpark.tk/api/guestcustomers/:id
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	{
    "_id": "613eb5a6580bec4e7cfedcd4",
    "name": null,
    "vehicalnumber": "ac2575",
    "__v": 0
}

Success		-	Status code 200 OK + “Done!!!”
  
Error			-	Status code 400 + {'Error: '+ err}

## To add a guest customer
URL 			- 	https://quickpark.tk/api/guestcustomers/add
  
Method 		- 	POST
  
Auth required		-	No
  
Data			-	{
    "name": [name in String],
    "vehiclenumber": [vehicle number in String]
}

Data example		-	{
    "name": "hasangi",
    "vehiclenumber": "WP5577"
}


Success		-	Status code 200 OK + “User added!!!”
  
Error			-	Status code 400 + {'Error: '+ err}

## To get all parking lots
URL			-	https://quickpark.tk/api/parkinglot
  
Method		-	GET
  
Auth required		-	Yes
  
Data example		-	[
    {
        "_id": "616941c110cdc21d5cbbfe90",
        "company": "ABC Mall",
        "location": "Colombo",
        "hourlyrate": 200,
        "nooffloors": 3,
        "email": "abcmall@gmail.com",
        "__v": 0
    }
]

Success		-	Status code 200 OK 
  
Error			-	Status code 400 + {'Error: '+ err}

## To add a new parking lot
URL			-	https://quickpark.tk/api/parkinglot/add
  
Method		-	POST
  
Auth required		-	No
  
Data example		-	[
    {
        "company": "ABC Mall",
        "location": "Colombo",
        "hourlyrate": 150,
        "nooffloors": 3,
        "email": "abcmall@gmail.com"
    }
]
  
Success		-	Status code 201
  
Error			-	Status code 400 + {'Error: '+ err}

## Sign in for registered car park owners
URL			-	https://quickpark.tk/api/parkinglot/signin
  
Method		-	POST
  
Auth required		-	No
  
Data example		-	[
    {
        "email": "abcmall@gmail.com",
        "password": "######"
    }
]

Success		-	Status code 200 +     {
    "success": true,
    "token": [token]
}

Error			-	Status code 403
             

## To set the hourly rate
URL 			- 	https://quickpark.tk/api/parkinglot/setrate
  
Method 		- 	POST
  
Auth required		-	No
  
Data example		-	{
       	 "email": "abcmall@gmail.com",
 "hourlyrate": 250
   }

Success		-	Status code 200 OK + “Hourly rate updated!”
  
Error			-	Status code 400 + {'Error: '+ err}

## To get the hourly rate
URL 			- 	https://quickpark.tk/api/parkinglot/getrate/:email
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	200
  
Success		-	Status code 200 OK + get the hourly rate
  
Error			-	Status code 400 + {'Error: '+ err}

## To get all the parking spots
URL 			- 	https://quickpark.tk/api/parkingspots
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	[
    {
        "_id": "6149d25148c0381f44efecdc",
        "spotno": "A001",
        "state": "Occupied",
        "floornumber": 1,
        "__v": 0
    },
    {
        "_id": "616d64f59e349513982c71bd",
        "spotno": "A002",
        "state": "Not Occupied",
        "floornumber": 1,
        "__v": 0
    }
 ]

Success		-	Status code 200 OK + get all parking spots
  
Error			-	Status code 400 + {'Error: '+ err}

## To add a spot to the database
URL 			- 	https://quickpark.tk/api/parkingspots/add
  
Method 		- 	POST
  
Auth required		-	No
  
Data example		-	 {
        "spotno": "A002",
        "state": "Not Occupied",
        "floornumber": 1
   }
  
Success		-	Status code 200 OK + 'Spot Assigned!!!'
  
Error			-	Status code 400 + {'Error: '+ err}

## To get the spot status
URL 			- 	https://quickpark.tk/api/parkingspots/:spot_id
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	{
    "success": true,
    "state": "Occupied",
    "customerID": "6174e9bfdb047d078931db2c",
    "vehiclenumber": "QQ9999"
}

Success		-	Status code 200 + {success: true, user},
				Status code 200 + { success: true, spot}
  
Error			-	Status code 406 + {success: false, error: error.message}

## To get all registered customers
URL			-	https://quickpark.tk/api/registeredcustomers/
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	[
    {
        "vehiclenumber": [
            "WP5529",
            "AB5628",
            "Www-5560",
            "BE-2398",
            "AP -2354",
            "We1234"
        ],
        "vehiclemodel": [
            "Toyota corolla",
            "VW Golf",
            "Mazda-Rx7",
            "Nissan petrol",
            "Nissan-GTx",
            "Wagonr"
        ],
        "_id": "6149de42ee073b078846c57b",
        "name": "sandun",
        "email": "e17251@eng.pdn.ac.lk",
        "paymentmethod": "online"
    }
]

Success		-	Status code 200 + All registered customers
  
Error			-	Status code 400 + {'Error: '+ err}

## To register a customer (Registration)
URL			-	https://quickpark.tk/api/registeredcustomers/add
  
Method 		- 	POST
  
Auth required		-	No
  
Data example		-	{
    "email": "e17251@eng.pdn.ac.lk",
    "password": "#######"
}
  
Success		  -	Status code 201 
  
Error			-	Status code 400 + {'Error: '+ err}

## Sign in for customer
URL			-	https://quickpark.tk/api/registeredcustomers/signin
  
Method 		- 	POST
  
Auth required		-	No
  
Data example    -	{
    "email": "e17251@eng.pdn.ac.lk",
    "password": "#######"
}
  
Success		-	sendToken(user, 200, res) 
				{
    "success": true,
    "token": [token]
}

Error			-	Status code 403


## To add vehicle number and model
URL			-	https://quickpark.tk/api/registeredcustomers/updateVnumberVmodel
  
Method 		- 	POST
  
Auth required		-	No
  
Data example		-	{
    "_id": "6149de42ee073b078846c57b",
    "vehiclenumber": "WP5529",
    "vehiclemodel": "Audi A5"
}

Success		-	Status code 200 OK + result
  
Error			-	Status code 400 + err

## Reservations count (made on the same day)
URL			-	https://quickpark.tk/api/reservation/getcountall
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	0
  
Success		-	Status code 200 OK + Count of reservations
  
Error			-	Status code 400 + err

## Occupied reservations count (made on the same day)
URL			-	https://quickpark.tk/api/reservation/getOccupiedcount
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	0
  
Success		-	Status code 200 OK + Count of occupied reservations
  
Error			-	Status code 400 + err

## Completed reservations count (made on the same day)
URL			-	https://quickpark.tk/api/reservation/getcompletedcount
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	0
  
Success		-	Status code 200 OK + Count of completed reservations
  
Error			-	Status code 400 + err

## All reservations
URL			-	https://quickpark.tk/api/reservation/
  
Method 		- 	GET
  
Auth required		-	Yes
  
Data example		-	[
    {
        "_id": "61692adfebe00530cc644d03",
        "customerID": "6149de42ee073b078846c57b",
        "dateandtime": "11:52",
        "status": "Occupied",
        "created": "2021-10-15T07:16:47.221Z",
        "__v": 0,
        "parkingspotID": "A003",
        "state": "Completed"
    },
    {
        "_id": "616948f9d72a45240493fe9e",
        "customerID": "6149de42ee073b078846c57b",
        "dateandtime": "10:50",
        "status": "Occupied",
        "created": "2021-10-15T09:25:13.959Z",
        "__v": 0,
        "parkingspotID": "A005",
        "state": "Completed"
    },
    {
        "_id": "616c67623dbbb94700e91ef1",
        "customerID": "616c672f3dbbb94700e91e71",
        "dateandtime": "22:45",
        "status": "Occupied",
        "state": "Not Completed",
        "created": "2021-10-17T18:11:46.033Z",
        "__v": 0,
        "parkingspotID": "A003"
    }
]

Success		-	Status code 200 OK + Details of all the reservations
  
Error			-	Status code 400 + err

## Add a new reservation
URL			-	https://quickpark.tk/api/reservation/add
  
Method 		- 	POST
  
Auth required		-	No
  
Data example		-	{
    "hours": "15",
    "minutes": "15",
    "Ruser": "6149de42ee073b078846c57b"
}

Success		-	Status code 200 OK + New reservation details
				{
    "_id": "616e4d8a820e322dc8b77ebb",
    "customerID": "6149de42ee073b078846c57b",
    "dateandtime": "15:15",
    "status": "Not Confirmed",
    "state": "Not Completed",
    "created": "2021-10-19T04:46:02.114Z",
    "__v": 0
}

Error			-	Status code 400 + err
