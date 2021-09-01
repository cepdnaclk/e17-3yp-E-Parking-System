const router = require('express').Router();
const { protect } = require('../middlewere/auth');
let RegUser = require('../models/RegisteredCustomers.model.js');

router.route('/').get((req, res, next) =>{
    console.log("123")
    RegUser.find()
    .then(RegisteredCustomers => res.json(RegisteredCustomers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/user').get(protect, (req, res, next) =>{
    //console.log(req.user._id);
    RegUser.findById(req.user._id)
    .then(RegisteredCustomers => res.json(RegisteredCustomers))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) =>{
    
    RegUser.findById(req.params.id)
    .then(RegisteredCustomers => res.json(RegisteredCustomers))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Registration
router.route("/add").post((req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const contact = Number(req.body.contactnumber);
    const password = req.body.password;
    const paymentmethod = req.body.paymentmethod;
    const vehicalnumber = req.body.vehicalnumber;

    const user = new RegUser({
        name,
        email,
        contact,
        password,
        paymentmethod,
        vehicalnumber
    });

    user.save().then(() => sendToken(user, 201, res))
    .catch(err => res.status(400).json('Error: '+ err));
});

//Sign In
router.route("/signin").post(async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        res.status(400).json("Please provide email and password")
    }
    try{
        const user = await RegUser.findOne({ email }).select("+password");
        if(!user){
            res.status(404).jason("Invalid credentials");
        }
        const isMatch = await user.matchPasswords(password);
        
        if(!isMatch){
            res.status(404).jason("Invalid credentials");
        }

        sendToken(user, 200, res);

    }catch(error){
        res.status(500).json("hi");
    }
});

router.route('/:id').delete((req, res) =>{
    RegUser.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Deleted!!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    RegUser.findById(req.params.id)
    .then(RegUser => {
        RegUser.name = req.body.name;
        RegUser.email = req.body.email;
        RegUser.contact = req.body.contact;
        RegUser.password = req.body.password;
        RegUser.paymentmethod = req.body.paymentmethod;
        RegUser.vehicalnumber = req.body.vehicalnumber;

        RegUser.save()
            .then(() => res.json('User Updated!!!'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token});
}
module.exports = router;



