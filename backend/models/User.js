const mongoose = require('mongoose');
const Joi = require('joi');
const jwt =require("jsonwebtoken")
// const Ajv = require("ajv")


// User Shema

const UserSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true ,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 7,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    profilePhoto: {
        type: Object,
        default: {
            url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            publicId: null
        }
    },
    bio: {
        type: String,
        
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
},
{
    timesstamps: true,
    toJSON:{ virtuals: true},
    toObject:{ virtuals: true},
});
// Populate Posts that belonges to this user when he/she get his/her profile
UserSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user", 
    localField: "_id",
});

// Generte Auth token
UserSchema.methods.generateAuthToken = function(){
    return jwt.sign({id: this._id, isAdmin: this.isAdmin},process.env.JWT_SECRET ,{expiresIn: '30d'})
}
// User Model
const User = mongoose.model('User',UserSchema);
// validate register user
function validateRegisterUser(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(50).required(),
        email: Joi.string().trim().email(7).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}
// validate Login user
function  validateLoginUser (obj) {
    const schema = Joi.object({
        email: Joi.string().trim().email(7).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return  schema.validate(obj);
    
}

// validate Update user
function  validateUpdateUser (obj) {
    const schema = Joi.object({
        username: Joi.string().trim().email(2).max(100),
        password: Joi.string().trim().min(8),
        bio: Joi.string(),
    });
    return  schema.validate(obj);
    
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
    };