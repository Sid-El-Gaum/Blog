const mongoose = require('mongoose');
const Joi = require('joi');

const CommentSchema = new mongoose.Schema({
    postId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Post",
        require: true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    }
},{
    timestamps: true,
})

// Comment Model
const Comment = mongoose.model("Comment",CommentSchema);

// Validate Create Comment
function validateCreateComment(obj){
    const schema = Joi.object({
        postId : Joi.string().required().label('Post Id'),
        text: Joi.string().trim().required()
    });
    return schema.validate(obj);
}
// Validate Update Comment
function validateUpdateComment(obj){
    const schema = Joi.object({
        text: Joi.string().trim().required()
    });
    return schema.validate(obj);
}

module.exports ={
    Comment,
    validateCreateComment,
    validateUpdateComment
}