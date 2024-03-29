const router = require('express').Router();
const { protect } = require('../middlewere/auth');
let RegUser = require('../models/RegisteredCustomers.model.js');
const Validator = require('validatorjs');


// To get all the users.
router.route('/').get(protect, (req, res, next) =>{
    RegUser.find()
    .then(RegisteredCustomers => res.json(RegisteredCustomers))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get count of a day
router.route('/getcountall').get(protect, (req, res) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    RegUser.countDocuments({created: {$gte: today}})
    .then(count => res.json(count))
    .catch(err => res.status(400).json('Error: ' + err));
});



//Protected Rout for getting user information.
router.route('/user').get(protect, (req, res, next) =>{
    console.log("user");
    RegUser.findById(req.user._id)
    .then(RegisteredCustomers => res.json(RegisteredCustomers))
    .catch(err => res.status(400).json('Error: ' + err));

});

//Registration.
router.route("/add").post((req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name);

    let data = {
        name: name,
        email: email,
        password: password 
    };

    let rules = {
        name: 'string',
        email: 'email|string',
        password: 'string'
      };
      
      let validation = new Validator(data, rules);
      
      if(validation.fails()){
        console.log("validator fails")
        return res.json("Validation of Input: " + validation.errors.first());
      };

    console.log(email);  
    const user = new RegUser({
        name,
        email,
        password,
    });
    console.log(user);
    user.save().then(() => sendToken(user, 201, res))
    .catch(err => res.status(400).json('Error: '+ err));
});

//Sign In.
router.route("/signin").post(async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let data = {
        email: email,
        password: password 
    };

    let rules = {
        email: 'email|string',
        password: 'string'
      };
      
      let validation = new Validator(data, rules);
      
      if(validation.fails()){
        return res.json("Validation of Input: " + validation.errors.first());
      };

    if(!email || !password){
        return res.status(400).json({success: false, error: "Please provide email and password"})
    }
    try{
        const user = await RegUser.findOne({ email }).select("+password");
        console.log(user);
        if(!user){
            return res.status(404).json({success: false, error: "Invalid credentials"});
        }
        const isMatch = await user.matchPasswords(password);
        
        if(!isMatch){
            return res.status(405).json({success: false, error: "Invalid credentials"});
        }

        sendToken(user, 200, res);

    }catch(error){
        res.status(406).json({success: false, error: error.message});
    }
});

//test to find whether we can access the array...
router.route("/test").post( async(req, res, next) => {
    const vehiclenumber = req.body.vehiclenumber;
    try{
        const user = await RegUser.findOne({vehiclenumber: vehiclenumber}).select('+_id');
    }
    catch(error){
        res.status(406).json({success: false, error: error.message});
    }
});

//update the vehiclenumbers and vehicalmodels.
router.route("/updateVnumberVmodel").post(function(req, res) {
    RegUser.updateOne(
      { _id: req.body._id },
      {$push: { vehiclenumber: [req.body.vehiclenumber], vehiclemodel: [req.body.vehiclemodel]  }},
      function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
      }
    );
});


// router.route('/:id').delete((req, res) =>{
//     RegUser.findByIdAndDelete(req.params.id)
//     .then(() => res.json('User Deleted!!!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) =>{
//     RegUser.findById(req.params.id)
//     .then(RegUser => {
//         RegUser.name = req.body.name;
//         RegUser.email = req.body.email;
//         RegUser.contact = req.body.contact;
//         RegUser.password = req.body.password;
//         RegUser.paymentmethod = req.body.paymentmethod;
//         RegUser.vehicalnumber = req.body.vehicalnumber;

//         RegUser.save()
//             .then(() => res.json('User Updated!!!'))
//             .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

//Setting up the user token.
const sendToken = (user, statusCode, res) => {
    console.log("came to sendtoken");
    const token = user.getSignedToken();
    console.log(token);
    res.status(statusCode).json({ success: true, token});
}

module.exports = router;


