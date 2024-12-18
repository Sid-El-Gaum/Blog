const asyncHandler = require('express-async-handler');
const {User, validateRegisterUser, validateLoginUser} = require('../models/User');
const bycrypt = require('bcryptjs');





/**-----------------------------------
* @desc    Register new user
* @route   /api/auth/register
* @method  POST
* @access  Public
--------------------------------------*/


module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
    //validetion
    // const  error  =  validateRegisterUser(req.body);
    // console.log(error)
    // if(error) {
    //     return res.status(400).json({message : error.details[0].message});
    // }
    // is user exist
    let user = await User.findOne({email: req.body.email});
    if(user) {
        return res.status(400).json({message:'User already exist'});
    } 
    // hash password
    const salt = await bycrypt.genSalt(10);
    const hashPassword = await bycrypt.hash(req.body.password, salt);
    // create user
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    });
    // save user
    await user.save();
    //sending email (verify account)

    // send response
    res.status(201).json({message:'Your registered successfully, please log in '});

})

/**-----------------------------------
* @desc    Log in
* @route   /api/auth/login
* @method  POST
* @access  Public
--------------------------------------*/
module.exports.loginUserCtrl = asyncHandler(async(req,res)=>{
    // 1-validation
    // const { error } = validateLoginUser(req.body);
    // if(error) {
    //     return res.status(400).json({message : error.details[0].message});
    // }
    // 2-is user exist
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({message: "invalid email or password"})
    }
    // 3-check the passwor
    const isPasswordMatch = await bycrypt.compare(req.body.password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({message: "invalid email or password"})
    }
    // 4-1
    // 4-generate token (jwt)
    const token = user.generateAuthToken();
    // 5-response to client
    res.status(200).json({
        _id: user._id,
        isAdmin : user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
    })

})