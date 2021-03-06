const router = require('express').Router();
let GuestUser = require('../models/GuestCustomer.model.js');
const { protect } = require('../middlewere/auth');

router.route('/').get(protect, (req, res) =>{
    GuestUser.find()
    .then(GuestCustomers => res.json(GuestCustomers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(protect, (req, res) =>{
    GuestUser.findById(req.params.id)
    .then(GuestCustomers => res.json(GuestCustomers))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/add").post((req, res) => {
    const name = req.body.name;
    const vehicalnumber = req.body.vehicalnumber;

    const NewGuestUser = new GuestUser({
        name,
        vehicalnumber
    });

    NewGuestUser.save().then(() => res.json('User added!!!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) =>{
    GuestUser.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Deleted!!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    GuestUser.findById(req.params.id)
    .then(GuestUser => {
        GuestUser.name = req.body.name;
        GuestUser.vehicalnumber = req.body.vehicalnumber;

        GuestUser.save()
            .then(() => res.json('User Updated!!!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;



