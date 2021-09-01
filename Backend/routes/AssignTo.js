const router = require('express').Router();
const path = require('path');
let AssignSpot = require('../models/AssignTo.model.js');
let ParkingSpot = require('../models/ParkingSpot.model.js');

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

router.route("/add").post((req, res) => {
    const { spawn } = require('child_process');

    const childPy = spawn('python', [path.join(__dirname, '../algorithms/parkingspot_assign_algo.py'), ]);
    childPy.stdout.on('data', (data) => {
        console.log(`str: ${data}`);
    });

    childPy.on('close', (code) => {
        console.log("0");
    });

    const customerID = req.body.customerID;
    const parkingspotID = "1";
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



