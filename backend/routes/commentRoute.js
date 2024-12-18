const router = require('express').Router();
const { createcommentCtlr, getAllCommentsCtlr, deleteCommentsCtlr, updateCommentCtlr } = require('../controllers/commentController');
const {verifyToken, verifyTokenAndAdmin} = require("../middlewares/verifyToken")
const validateObjectId  = require('../middlewares/validateObjectId');

// /api/comments

router.route('/')
.post(verifyToken,createcommentCtlr)
.get(verifyTokenAndAdmin, getAllCommentsCtlr);

// /api/comments/:id

router.route("/:id")
    .delete(validateObjectId, verifyToken, deleteCommentsCtlr)
    .put(validateObjectId,verifyToken,updateCommentCtlr);

module.exports= router;