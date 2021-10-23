const router = require('express').Router();
const { protect } = require('../middlewere/auth');
let Reserve = require('../models/Reservation.model.js');
let ParkingSpot = require('../models/ParkingSpot.model.js');
let AssignSpot = require('../models/AssignTo.model.js');
const path = require('path');
const schedule = require('node-schedule');


//For Testing
router.route('/temp').get(async(req, res, next) =>{
    const reserved = await Reserve.findOne({ customerID: "6149de42ee073b078846c57b", state: "Not Completed"}).select("+_id");
    try{
        //Pass
    }catch(err){
        res.status(400).json('Error: ' + err);
    }
});

//get count - ALL
router.route('/getcountall').get(protect, (req, res) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    Reserve.countDocuments({created: {$gte: today}})
    .then(Reservation => res.json(Reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get occupied reservation
router.route('/getOccupiedcount').get(protect, (req, res) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    Reserve.countDocuments({$and: [{status: "Occupied", created: {$gte: today}}]})
    .then(Reservation => res.json(Reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get completed reservations
router.route('/getcompletedcount').get(protect, (req, res) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    Reserve.countDocuments({$and: [{state: "Completed", created: {$gte: today}}]})
    .then(Reservation => res.json(Reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get all reservations
router.route('/').get(protect, (req, res) =>{
    Reserve.find()
    .then(Reservation => res.json(Reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get details using customer ID
router.route('/:customerid').get(protect, (req, res) =>{
    Reserve.find({customerID: req.params.customerid})
    .then(Reservation => res.json(Reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Event handler for assigining the parking spot after one hour after the reservation
router.route('/test/:id').get(protect, async(req, res) =>{
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);  

    let Ct = new Date(Date.now()); 
    Ct.setMinutes(Ct.getMinutes()+1);
    schedule.scheduleJob(req.params.id,Ct, async() => {
        const Nt = new Date().toString();
        const AllParkingSpots = await ParkingSpot.find();
        const LastAssignedSpot = await AssignSpot.find().sort( { _id : -1 } ).limit(1);
        
        try{
            
            const { spawn } = require('child_process');    
            const childPy = spawn('python', [path.join(__dirname, '../algorithms/spot_picking_algo.py'), LastAssignedSpot[0]['parkingspotID'], JSON.stringify(AllParkingSpots)]);
            childPy.stdout.on('data', (data) => {
                const newspot = data.toString();

                if(newspot == "Car Park is full"){
                    return res.status(400).json("Car Park is full");
                };
                
                UpdateParkingSpotState(newspot);
                addnewparkingspotinreservation(newspot, req.params.id);                                                    
            });
        
            childPy.on('close', (code) => {
               //Do nothing
            });
        }
        catch(error){
            return res.status(406).json({success: false, error: error.message});
        }
        const data = `data: ${JSON.stringify(Nt)}\n\n`;
        res.write(data);
        res.end();
    });
});

//updating the parking spot collection
async function UpdateParkingSpotState ( NewParkingSpot ) {
    const tobeupdated = await ParkingSpot.findOne({ spotno: NewParkingSpot }).select("+_id");
    tobeupdated.state = "Occupied";
    tobeupdated.save(); 
};

//updating the parking spot in reservation
async function addnewparkingspotinreservation(newspot, id){
    const tobeupdated = await Reserve.findOne({ _id: id }).select("+_id");
    tobeupdated.parkingspotID = newspot;
    tobeupdated.status = "Occupied";
    tobeupdated.save();
};

//adding a reservation
router.route("/add").post((req, res) => {
    const hours = req.body.hours;
    const minutes = req.body.minutes;
    const customerID = req.body.Ruser;
    const status = "Not Confirmed";
    const state = "Not Completed";

    const dateandtime = `${hours}:${minutes}`

    const newReservation = new Reserve({
        customerID,
        dateandtime,
        status,
        state
    });

    newReservation.save().then(async() => res.json(newReservation))
    .catch(err => res.status(400).json('Error: '+ err));
});





// router.route('/:id').delete((req, res) =>{
//     Reserve.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Reservation Deleted!!!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) =>{
//     Reserve.findById(req.params.id)
//     .then(Reserve => {
//         Reserve.customerID = req.body.customerID;
//         Reserve.parkingspotID = req.body.parkingspotID;
//         Reserve.floornumber = req.body.floornumber;
//         Reserve.dateandtime = req.body.dateandtime;
//         Reserve.status = req.body.status;

//         Reserve.save()
//             .then(() => res.json('Reservation Updated!!!'))
//             .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;

