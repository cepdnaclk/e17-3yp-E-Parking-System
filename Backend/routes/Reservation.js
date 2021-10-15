const router = require('express').Router();
let Reserve = require('../models/Reservation.model.js');
let ParkingSpot = require('../models/ParkingSpot.model.js');
let AssignSpot = require('../models/AssignTo.model.js');
const path = require('path');
const schedule = require('node-schedule');

router.route('/').get((req, res) =>{
    Reserve.find()
    .then(Reservation => res.json(Reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:customerid').get((req, res) =>{
    Reserve.find({customerID: req.params.customerid})
    .then(Reservation => res.json(Reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/test/:id').get(async(req, res) =>{
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
        console.log(LastAssignedSpot);
        console.log(LastAssignedSpot[0]['parkingspotID']);
        
        try{
            
            const { spawn } = require('child_process');    
            const childPy = spawn('python', [path.join(__dirname, '../algorithms/parkingspot_assign_algo.py'), LastAssignedSpot[0]['parkingspotID'], AllParkingSpots]);
            childPy.stdout.on('data', (data) => {
                console.log({data});
                const newspot = data.toString();

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
        console.log(Nt);
        res.write(data);
        res.end();
    });
});

async function addnewparkingspotinreservation(newspot, id){
    const tobeupdated = await Reserve.findOne({ _id: id }).select("+_id");
    console.log(newspot);
    console.log(id);
    console.log(tobeupdated);
    tobeupdated.parkingspotID = newspot;
    tobeupdated.status = "Occupied";
    tobeupdated.save();
};

async function UpdateParkingSpotState ( NewParkingSpot ) {
    console.log(NewParkingSpot);
    const tobeupdated = await ParkingSpot.findOne({ spotno: NewParkingSpot }).select("+_id");
    tobeupdated.state = "Occupied";
    tobeupdated.save(); 
};

router.route("/add").post((req, res) => {
    const hours = req.body.hours;
    const minutes = req.body.minutes;
    const customerID = req.body.Ruser;
    const status = "Not Confirmed";

    const dateandtime = `${hours}:${minutes}`
    console.log(dateandtime);

    const newReservation = new Reserve({
        customerID,
        dateandtime,
        status
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

