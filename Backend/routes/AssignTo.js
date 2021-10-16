const router = require('express').Router();
const path = require('path');
let AssignSpot = require('../models/AssignTo.model.js');
let ParkingSpot = require('../models/ParkingSpot.model.js');
let RegUser = require('../models/RegisteredCustomers.model.js');
let Reserve = require('../models/Reservation.model.js');
let GuestUser = require('../models/GuestCustomer.model');

//Dummy assigining to test.
router.route('/po').post((req, res) =>{
    
    const customerID = req.body.customerID;
    const parkingspotID = req.body.parkingspotID;
    const vehiclenumber = req.body.vehiclenumber;
    const cost = req.body.cost;
    const checkin = req.body.checkin;

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
            console.log(vehiclenumber);
            const newAssign = new GuestUser({
                vehiclenumber
            });
        
            newAssign.save().then(console.log('User assigned!!!'))
            .catch(console.log('Error: ' + err));
            
            console.log(vehiclenumber);
            const user = await GuestUser.findOne({vehiclenumber}).select("+_id");
            console.log(user);
            const AllParkingSpots = await ParkingSpot.find();
            const LastAssignedSpot = await AssignSpot.find().sort( { _id : -1 } ).limit(1);
            console.log(LastAssignedSpot);
            console.log(LastAssignedSpot[0]['parkingspotID']);
            try{        
                const { spawn } = require('child_process');    
                const childPy = spawn('python', [path.join(__dirname, '../algorithms/parkingspot_assign_algo.py'), LastAssignedSpot[0]['parkingspotID'], AllParkingSpots]);
                childPy.stdout.on('data', (data) => {
                    console.log({data});
                    const newspot = data.toString();

                    UpdateParkingSpotState(newspot);                 
                        
                    const customerID = user["_id"];
                    const parkingspotID = newspot;
                    const vehiclenumber = vehiclenumber;
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
            console.log(customerIDfromuser);
            const reserved = await Reserve.findOne({ customerID: customerIDfromuser }).select("+_id");
            console.log(reserved);
            if(!reserved){

                const AllParkingSpots = await ParkingSpot.find();
                const LastAssignedSpot = await AssignSpot.find().sort( { _id : -1 } ).limit(1);
                console.log(LastAssignedSpot);
                console.log(LastAssignedSpot[0]['parkingspotID']);
                try{
            
                    const { spawn } = require('child_process');    
                    const childPy = spawn('python', [path.join(__dirname, '../algorithms/parkingspot_assign_algo.py'), LastAssignedSpot[0]['parkingspotID'], AllParkingSpots]);
                    childPy.stdout.on('data', (data) => {
                        console.log({data});
                        const newspot = data.toString();

                        UpdateParkingSpotState(newspot);                 
                            
                        const customerID = customerIDfromuser
                        const parkingspotID = newspot;
                        const vehiclenumber = vehiclenumber;
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
                const parkingspotID = reserved;
                const vehiclenumber = vehiclenumber;
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

async function UpdateParkingSpotState ( NewParkingSpot ) {
    console.log(NewParkingSpot);
    const tobeupdated = await ParkingSpot.findOne({ spotno: NewParkingSpot }).select("+_id");
    tobeupdated.state = "Occupied";
    tobeupdated.save(); 
};


router.route('/:id').get(async(req, res) =>{
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);    
    try{
        console.log(req.params.id);
        let AssignedUser = null
        while(!AssignedUser){
            console.log(AssignedUser);
            AssignedUser = await AssignSpot.findOne({customerID: req.params.id}).select("+_id");
        }
        const data = `data: ${JSON.stringify(AssignedUser)}\n\n`;        
        console.log(data);
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



