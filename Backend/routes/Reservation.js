const router = require('express').Router();
let Reserve = require('../models/Reservation.model.js');

router.route('/').get((req, res) =>{
    Reserve.find()
    .then(Reservation => res.json(Reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) =>{
    Reserve.findById(req.params.id)
    .then(Reservation => res.json(Reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/add").post((req, res) => {
    const customerID = req.body.customerID;
    const parkingspotID = req.body.parkingspotID;
    const floornumber = req.body.floornumber;
    const dateandtime = req.body.dateandtime;
    const status = req.body.status;


    const newReservation = new Reserve({
        customerID,
        parkingspotID,
        floornumber,
        dateandtime,
        status
    });


    newReservation.save().then(() => res.json('Reserved!!!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) =>{
    Reserve.findByIdAndDelete(req.params.id)
    .then(() => res.json('Reservation Deleted!!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    Reserve.findById(req.params.id)
    .then(Reserve => {
        Reserve.customerID = req.body.customerID;
        Reserve.parkingspotID = req.body.parkingspotID;
        Reserve.floornumber = req.body.floornumber;
        Reserve.dateandtime = req.body.dateandtime;
        Reserve.status = req.body.status;

        Reserve.save()
            .then(() => res.json('Reservation Updated!!!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

