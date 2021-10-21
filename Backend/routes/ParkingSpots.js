const router = require('express').Router();
const { protect } = require('../middlewere/auth');
let ParkingSpot = require('../models/ParkingSpot.model.js');
let AssignSpot = require('../models/AssignTo.model.js');
let RegUser = require('../models/RegisteredCustomers.model.js');

router.route('/').get((req, res) =>{
    ParkingSpot.find()
    .then(ParkingSpots => res.json(ParkingSpots))
    .catch(err => res.status(400).json('Error: ' + err));
});

//To add a spot/update status of spot
router.route("/add").post((req, res) => {
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

//GET spot states and vehicle number and customerID if occupied
router.route("/states").get(async(req, res, next) => {
    try {
        const result = [];
        const spots = await ParkingSpot.find().select("spotno state -_id");

        spots.forEach(async function (spot) {
            if (spot.state === "Occupied") {
                const assignedcustomer = await AssignSpot.findOne({ parkingspotID: spot.spotno, cost: 0 }).select("+_id");

                const spotInfo = {
                    spotno: spot.spotno,
                    state: spot.state,
                    vehiclenumber: assignedcustomer.vehiclenumber
                };
                result.push(spotInfo);
            }
            else {
                result.push(spot);
            }

            if (result.length == spots.length) {
                res.status(200).json(result);
            }
        });
    }
    catch(error){
        res.status(406).json({success: false, error: error.message});
    }
});

router.route("/count").get(async(req, res, next) => {
    ParkingSpot.countDocuments({})
    .then(ParkingSpots => res.json(ParkingSpots))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:spotno").get(async(req, res, next) => {
    
    const spotno = req.params.spotno;

    try{
        const spot = await ParkingSpot.findOne({ spotno }).select("+_id");
        //console.log(spot);
        if(spot['state'] == "Occupied"){//***********
            const assignedcustomer = await AssignSpot.findOne({ parkingspotID: spotno, cost: 0 }).select("+_id");
            const customerID = assignedcustomer["customerID"];
            //console.log(customerid);
            //const user = await RegUser.findById(customerid);
            res.status(200).json({success: true, state: "Occupied", customerID, vehiclenumber: assignedcustomer["vehiclenumber"]});

        }
        else{
            res.status(200).json({ success: true, state: spot['state']}); 

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



