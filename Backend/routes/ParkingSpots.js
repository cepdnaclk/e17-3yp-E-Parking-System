const router = require('express').Router();
let ParkingSpot = require('../models/ParkingSpot.model.js');

router.route('/').get((req, res) =>{
    ParkingSpot.find()
    .then(ParkingSpots => res.json(ParkingSpots))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) =>{
    ParkingSpot.findById(req.params.id)
    .then(ParkingSpots => res.json(ParkingSpots))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/add").post((req, res) => {
    const state = req.body.state;
    const floornumber = Number(req.body.floornumber);
  
    const newParkingSpot = new ParkingSpot({
        state,
        floornumber
    });

    newParkingSpot.save().then(() => res.json('Spot Assigned!!!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) =>{
    ParkingSpot.findByIdAndDelete(req.params.id)
    .then(() => res.json('ParkingSpot Deleted!!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    ParkingSpot.findById(req.params.id)
    .then(ParkingSpot => {
        ParkingSpot.state = req.body.state;
        ParkingSpot.floornumber = Number(req.body.floornumber);

        ParkingSpot.save()
            .then(() => res.json('ParkingSpot Updated!!!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;



