const mongoose = require('mongoose');
const Joi = require('joi');

const CategorySchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        require: true,
    },
    title: {
        type: String,
        require: true,
        trin: true,
    }
},{
    timestamps: true,
})

// Category Model
const Category = mongoose.model("Category",CategorySchema);

// Validate Create Category
function validateCreateCategory(obj){
    const schema = Joi.object({
        title : Joi.string().trim().required().label('Title'),
    });
    return schema.validate(obj);
}


module.exports ={
    Category,
    validateCreateCategory
}