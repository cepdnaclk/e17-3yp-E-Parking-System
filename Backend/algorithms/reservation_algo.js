let ParkingSpot = require('../models/ParkingSpot.model.js');
let Reserve = require('../models/Reservation.model.js');


//Launch this when a new reservation is added.
function serveReservation(reservationID) {
	let ts = Date.now();	//Current timestamp
	
	//Calculate time to wait
	const waitTime = /*Reserve[reservationID].Time*/ - ts - 3600000
	
	//Wait
	await new Promise(resolve => setTimeout(resolve, waitTime));
	
	
	//TODO:: Loop this every 1 minute and break out of loop if 30 mins have elapsed
	// Get one random spot that is unoccupied from database
	const newSpot = ParkingSpot.aggregate([{ $match: { state: 'unoccupied' } }, { $sample: { size: 1 } }])
	
	
	//TODO::
	//newSpot.update state to "reserved"

	//Wait 1hr30mins
	await new Promise(resolve => setTimeout(resolve, 5400000));
	
	//TODO::
	//Cancel reservation if it is still in the reserved state
	//If Reserve.findOne({reservationID}) where {status: "Reserved"} change status to cancelled
}