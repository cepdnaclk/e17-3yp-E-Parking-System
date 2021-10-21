const router = require('express').Router();
const path = require('path');
const { protect } = require('../middlewere/auth');
let AssignSpot = require('../models/AssignTo.model.js');
let ParkingSpot = require('../models/ParkingSpot.model.js');
let RegUser = require('../models/RegisteredCustomers.model.js');
let Reserve = require('../models/Reservation.model.js');
let GuestUser = require('../models/GuestCustomer.model');
const { Console } = require('console');

//Dummy assigining to test.
router.route('/po').post((req, res) =>{
    
    const customerID = req.body.customerID;
    const parkingspotID = req.body.parkingspotID;
    const vehiclenumber = req.body.vehiclenumber;
    const cost = req.body.cost;
    const checkin = req.body.checkin;
    const checkout = req.body.checkout;
    const duration = req.body.duration;

    const newAssign = new AssignSpot({
        customerID,
        parkingspotID,
        vehiclenumber,
        cost,
        checkin,
        checkout,
        duration
    });

    newAssign.save().then(() => res.json('User assigned!!!'))
    .catch(err => res.status(400).json('Error: '+ err));

});

//get count - ALL
router.route('/getcountall').get(protect, (req, res) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    AssignSpot.countDocuments({created: {$gte: today}})
    .then(Reservation => res.json(Reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

// To get all the assigned parking spots.
router.route('/').get((req, res) =>{
    AssignSpot.find()
    .then(AssignTo => res.json(AssignTo))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Assigning API call(Entrence Node)
router.route("/add").post(async(req, res) => {

    const vehiclenumber = req.body.vehiclenumber;
    const checkintime = req.body.checkin;

    if(!checkintime || !vehiclenumber){
        return res.status(400).json({success: false, error: "Please provide checkintime and vehiclenumber"})
    }

    try{
        const user = await RegUser.findOne({ vehiclenumber }).select("+_id");
        if(!user){

            
            //Guest user.
            const newAssign = new GuestUser({
                vehiclenumber : vehiclenumber
            });
        
            newAssign.save().then(console.log(newAssign + ' assigned'))
            .catch(err => console.log('Error: '+ err));
            
            const guestuser = await GuestUser.findOne({vehiclenumber}).select("+_id");
            const AllParkingSpots = await ParkingSpot.find().select("-_id");
            const LastAssignedSpot = await AssignSpot.find().sort( { _id : -1 } ).limit(1);


            //console.log(JSON.stringify(AllParkingSpots));
            //console.log(LastAssignedSpot[0]['parkingspotID']);

            try{
                const { spawn } = require('child_process');    
                const childPy = spawn('python', [path.join(__dirname, '../algorithms/spot_picking_algo.py'), LastAssignedSpot[0]['parkingspotID'], JSON.stringify(AllParkingSpots)]);
                childPy.stdout.on('data', (data) => {
                    console.log(data.toString());
                    const newspot = data.toString();

                    UpdateParkingSpotState(newspot);                 
                       
                    const customerID = guestuser["_id"];
                    const parkingspotID = newspot;
                    const cost = 0;
                    const checkin = checkintime;
                
                    const newAssign = new AssignSpot({
                        customerID,
                        parkingspotID,
                        vehiclenumber,
                        cost,
                        checkin
                    });
                
                    newAssign.save().then(() => res.json('User assigned!!!'))
                    .catch(err => res.status(400).json('Error: '+ err));
                });
            
                childPy.on('close', (code) => {
                   //Do nothing
                });
            }
            catch(error){
                return res.status(406).json({success: false, error: error.message});
            }
        }
        else{
            const customerIDfromuser = user["_id"];
            const reserved = await Reserve.findOne({ customerID: customerIDfromuser, state: "Not Completed" }).select("+_id");
            
            if(!reserved){

                const AllParkingSpots = await ParkingSpot.find();
                const LastAssignedSpot = await AssignSpot.find().sort( { _id : -1 } ).limit(1);

                try{

                    const { spawn } = require('child_process');    
                    const childPy = spawn('python', [path.join(__dirname, '../algorithms/spot_picking_algo.py'), LastAssignedSpot[0]['parkingspotID'], JSON.stringify(AllParkingSpots)]);
                    childPy.stdout.on('data', (data) => {
                        const newspot = data.toString();

                        UpdateParkingSpotState(newspot);                 
                            
                        const customerID = customerIDfromuser
                        const parkingspotID = newspot;
                        const cost = 0;
                        const checkin = checkintime;
                    
                        const newAssign = new AssignSpot({
                            customerID,
                            parkingspotID,
                            vehiclenumber,
                            cost,
                            checkin
                        });
                    
                        newAssign.save().then(() => res.json('User assigned!!!'))
                        .catch(err => res.status(400).json('Error: '+ err));
                    });
                
                    childPy.on('close', (code) => {
                       //Do nothing
                    });
                }
                catch(error){
                    return res.status(406).json({success: false, error: error.message});
                }
            }
            else{
                const customerID = customerIDfromuser;
                const parkingspotID = reserved["parkingspotID"];
                const cost = 0;
                const checkin = checkintime;
            
                const newAssign = new AssignSpot({
                    customerID,
                    parkingspotID,
                    vehiclenumber,
                    cost,
                    checkin
                });            
                newAssign.save().then(() => res.json('User assigned!!!'))
                .catch(err => res.status(400).json('Error: '+ err));
            }
        }
    }catch(error){
        res.status(406).json({success: false, error: error.message});
    }
});

//API call(Exit Node)
router.route("/exit").post(async(req, res) => {

    const vehiclenumber = req.body.vehiclenumber;
    const checkout = req.body.checkout;

    if(!checkout || !vehiclenumber){
        return res.status(400).json({success: false, error: "Please provide checkouttime and vehiclenumber"})
    }

    try{
        const user = await RegUser.findOne({ vehiclenumber }).select("+_id");
        if(!user){
            const guest = await GuestUser.findOne({ vehiclenumber }).select("+_id");
            const guestID = guest["_id"];
            completeassignspot(guestID, checkout);
            return res.json('Done!!!');
            
        }
        else{
            const customerIDfromuser = user["_id"];
            const reserved = await Reserve.findOne({ customerID: customerIDfromuser, state: "Not Completed", status: "Occupied" }).select("+_id");
            
            if(!reserved){
                completeassignspot(customerIDfromuser, checkout);
                return res.json('Done!!!');
                
            }
            else{
                completereservation(reserved);
                completeassignspot(customerIDfromuser, checkout);
                return res.json('Done!!!');

            }
        }
    }catch(error){
        res.status(406).json({success: false, error: error.message});
    }
});

//updating the parking spot collection
async function UpdateParkingSpotState ( NewParkingSpot ) {
    const tobeupdated = await ParkingSpot.findOne({ spotno: NewParkingSpot }).select("+_id");
    tobeupdated.state = "Occupied";
    tobeupdated.save(); 
};

//Have to implement this 
async function UpdateParkingSpotStateatexit ( NewParkingSpot ) {
    const tobeupdated = await ParkingSpot.findOne({ spotno: NewParkingSpot }).select("+_id");
    tobeupdated.state = "Not Occupied";
    tobeupdated.save(); 
};

//complete the reservation 
async function completereservation(reserved){
    reserved.state = "Completed";
    reserved.save();
};

//complete the assignto collection
async function completeassignspot(customerIDfromuser, checkout){
    const checkoutdetails = await AssignSpot.findOne({ customerID: customerIDfromuser, cost: 0 }).select("+_id");
    const currenttime = Date.now();
    const diffTime = Math.abs(currenttime - checkoutdetails["created"]);
    checkoutdetails.cost = 250;
    checkoutdetails.checkout = checkout;
    checkoutdetails.duration = diffTime
    checkoutdetails.save();
};

//event handler used in parking screen
router.route('/:id').get(protect, async(req, res) =>{
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);    
    try{
        let AssignedUser = null
        while(!AssignedUser){
            AssignedUser = await AssignSpot.findOne({$and: [{customerID: req.params.id, cost: 0}]}).select("+_id");
        }
        const data = `data: ${JSON.stringify(AssignedUser)}\n\n`;        
        res.write(data);
        res.end();
        
    }catch(error){
        res.status(406).json({success: false, error: error.message});
    }
});

// router.route('/:id').delete((req, res) =>{
//     AssignSpot.findByIdAndDelete(req.params.id)
//     .then(() => res.json('User Deleted!!!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) =>{
//     AssignSpot.findById(req.params.id)
//     .then(AssignSpot => {
//         AssignSpot.customerID = req.body.customerID;
//         AssignSpot.parkingspotID = req.body.parkingspotID;
//         AssignSpot.cost = Number(req.body.cost);
//         AssignSpot.checkin = req.body.checkin;
//         AssignSpot.checkout = req.body.checkout;
//         AssignSpot.duration = req.body.duration;

//         AssignSpot.save()
//             .then(() => res.json('Assigned User Updated!!!'))
//             .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;



