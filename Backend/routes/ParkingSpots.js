const router = require('express').Router();
const { protect } = require('../middlewere/auth');
let ParkingSpot = require('../models/ParkingSpot.model.js');
let AssignSpot = require('../models/AssignTo.model.js');
let RegUser = require('../models/RegisteredCustomers.model.js');

router.route('/').get(protect, (req, res) =>{
    ParkingSpot.find()
    .then(ParkingSpots => res.json(ParkingSpots))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/add").post(protect, (req, res) => {
    const spotno = req.body.spotno;
    const state = req.body.state;
    const floornumber = Number(req.body.floornumber);
  
    const newParkingSpot = new ParkingSpot({
        spotno,
        state,
        floornumber
    });

    newParkingSpot.save().then(() => res.json('Spot Assigned!!!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route("/:spotno").get(protect, async(req, res, next) => {
    
    const spotno = req.params.spotno;

    try{
        const spot = await ParkingSpot.findOne({ spotno }).select("+_id");
        console.log(spot);
        if(spot['state'] == "Occupied"){
            const assignedcustomer = await AssignSpot.findOne({ parkingspotID: spotno }).select("+_id");
            const customerid = assignedcustomer["customerID"];
            console.log(customerid);
            const user = await RegUser.findById(customerid);
            res.status(200).json({success: true, user});

        }
        else{
            res.status(200).json({ success: true, spot}); 

        }
        
    }catch(error){
        res.status(406).json({success: false, error: error.message});
    }
});

// router.route('/:id').delete((req, res) =>{
//     ParkingSpot.findByIdAndDelete(req.params.id)
//     .then(() => res.json('ParkingSpot Deleted!!!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update').post((req, res) =>{
//     ParkingSpot.findById(req.params.id)
//     .then(ParkingSpot => {
//         ParkingSpot.state = req.body.state;
//         ParkingSpot.floornumber = Number(req.body.floornumber);

//         ParkingSpot.save()
//             .then(() => res.json('ParkingSpot Updated!!!'))
//             .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;



