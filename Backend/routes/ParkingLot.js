const router = require('express').Router();
let PLT = require('../models/ParkingLot.model.js');

router.route('/').get((req, res) =>{
    PLT.find()
    .then(ParkingLot => res.json(ParkingLot))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) =>{
    PLT.findById(req.params.id)
    .then(ParkingLot => res.json(ParkingLot))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/add").post((req, res) => {
    const company = req.body.company;
    const location = req.body.location;
    const isfullyoccupied = req.body.isfullyoccupied;
    const hourlyrate = req.body.hourlyrate;
    const nooffloors = req.body.nooffloors;


    const newParkingLot = new PLT({
        company,
        location,
        isfullyoccupied,
        hourlyrate,
        nooffloors,
    });


    newParkingLot.save().then(() => res.json('Spot added!!!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) =>{
    PLT.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Deleted!!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    PLT.findById(req.params.id)
    .then(PLT => {
        PLT.company = req.body.company;
        PLT.location = req.body.location;
        PLT.isfullyoccupied = req.body.isfullyoccupied;
        PLT.hourlyrate = req.body.hourlyrate;
        PLT.nooffloors = req.body.nooffloors;

        PLT.save()
            .then(() => res.json('Spot Updated!!!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;



