const router = require('express').Router();
const path = require('path');
let AssignSpot = require('../models/AssignTo.model.js');
let ParkingSpot = require('../models/ParkingSpot.model.js');
let RegisteredCustomers = require('../models/RegisteredCustomers.model.js');

router.route('/').get((req, res) =>{
    AssignSpot.find()
    .then(AssignTo => res.json(AssignTo))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) =>{
    AssignSpot.findById(req.params.id)
    .then(AssignTo => res.json(AssignTo))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/add").post(async(req, res) => {
	/*TODO::
		req payload contains vehicle number
		Look up vehicle number in RegisteredCustomers.
		
		If found  =>
			customerID = RegisteredCustomers.customerID;
			
			If customerID in Reservations & 'Reserved' => get ParkingSpotID => Find that id in ParkingSpots and return
			
			Else => Spawn python child process to generate spot
			
		Else =>
			customerID = random number
			spawn python child process to generate spot
			
	*/

    // const LastAssignedSpot = await AssignSpot.find({}).sort({_id:-1}).limit(1);
    // console.log(LastAssignedSpot);
    const LastAssignedSpot = await AssignSpot.find({}).sort({_id:-1}).limit(1);
    const AllParkingSpots = await ParkingSpot.find();
    console.log(LastAssignedSpot[0]['parkingspotID']);
    try{

        const { spawn } = require('child_process');    
        const childPy = spawn('python', [path.join(__dirname, '../algorithms/parkingspot_assign_algo.py'), LastAssignedSpot[0]['parkingspotID'], AllParkingSpots]);
        childPy.stdout.on('data', (data) => {
            console.log(`str: ${data}`);

            const customerID = req.body.customerID;
            const parkingspotID = data.toString();
            const cost = Number(req.body.cost);
            const checkin = req.body.checkin;
            const checkout = req.body.checkout;
            const duration = req.body.duration;
        
            const newAssign = new AssignSpot({
                customerID,
                parkingspotID,
                cost,
                checkin,
                checkout,
                duration
            });
        
            newAssign.save().then(() => res.json('User assigned!!!'))
            .catch(err => res.status(400).json('Error: '+ err));

        });
    
        childPy.on('close', (code) => {
           // console.log("0");
        });
    }
    catch(error){
        return res.status(406).json({success: false, error: error.message});
    }


});

router.route('/:id').delete((req, res) =>{
    AssignSpot.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Deleted!!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    AssignSpot.findById(req.params.id)
    .then(AssignSpot => {
        AssignSpot.customerID = req.body.customerID;
        AssignSpot.parkingspotID = req.body.parkingspotID;
        AssignSpot.cost = Number(req.body.cost);
        AssignSpot.checkin = req.body.checkin;
        AssignSpot.checkout = req.body.checkout;
        AssignSpot.duration = req.body.duration;

        AssignSpot.save()
            .then(() => res.json('Assigned User Updated!!!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;



