const router = require('express').Router();
let Floor = require('../models/Floor.model.js');

router.route('/').get((req, res) =>{
    Floor.find()
    .then(Floors => res.json(Floors))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) =>{
    Floor.findById(req.params.id)
    .then(ParkingLot => res.json(ParkingLot))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/add").post((req, res) => {
    const parkinglotID = req.body.parkinglotID;
    const floornumber = req.body.floornumber;
    const isfullyoccupied = req.body.isfullyoccupied;
    const info = req.body.info;
    const noofparkingspots = req.body.noofparkingspots;


    const newFloor = new Floor({
        parkinglotID,
        floornumber,
        isfullyoccupied,
        info,
        noofparkingspots,
    });


    newFloor.save().then(() => res.json('Floor added!!!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) =>{
    Floor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Floor Deleted!!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    Floor.findById(req.params.id)
    .then(Floor => {
        Floor.parkinglotID = req.body.parkinglotID;
        Floor.floornumber = req.body.floornumber;
        Floor.isfullyoccupied = req.body.isfullyoccupied;
        Floor.info = req.body.info;
        Floor.noofparkingspots = req.body.noofparkingspots;

        Floor.save()
            .then(() => res.json('Spot Updated!!!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;



