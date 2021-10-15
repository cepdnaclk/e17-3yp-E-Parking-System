const router = require('express').Router();
const { protect } = require('../middlewere/auth');
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

//Create new Parking Lot
router.route("/add").post((req, res) => {
    const company = req.body.company;
    const location = req.body.location;
    const isfullyoccupied = req.body.isfullyoccupied;
    const hourlyrate = req.body.hourlyrate;
    const nooffloors = req.body.nooffloors;
    const email = req.body.email;
    const password = req.body.password;

    const newParkingLot = new PLT({
        company,
        location,
        isfullyoccupied,
        hourlyrate,
        nooffloors,
        email,
        password
    });


    newParkingLot.save().then(() => sendToken(newParkingLot, 201, res))
    .catch(err => res.status(400).json('Error: '+ err));
});


//Sign In.
router.route("/signin").post(async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(400).json({success: false, error: "Please provide email and password"})
    }
    try{
        const user = await PLT.findOne({ email }).select("+password");
        if(!user){
            return res.status(404).json({success: false, error: "Invalid credentials"});
        }
        console.log(user.password)
        const isMatch = await user.matchPasswords(password);
        console.log(isMatch);
        
        if(!isMatch){
            return res.status(405).json({success: false, error: "Invalid credentials"});
        }

        sendToken(user, 200, res);

    }catch(error){
        res.status(406).json({success: false, error: error.message});
    }
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

// Allow management portal to update hourly rate
// Expected POST data {email, hourlyrate}
router.route('/setrate').post((req, res) => {
    PLT.findOne({ email: req.body.email })
    .then(PLT => {
        PLT.hourlyrate = req.body.hourlyrate;

        PLT.save()
            .then(() => res.json('Hourly rate updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// Allow management portal to get current hourly rate
router.route("/getrate/:email").get((req, res) => {
    PLT.findOne({ email: req.params.email })
    .then(PLT => res.json(PLT.hourlyrate))
    .catch(err => res.status(400).json('Error: ' + err));
});


//Setting up the user token.
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    console.log(token);
    res.status(statusCode).json({ success: true, token});
}

module.exports = router;



