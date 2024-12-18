const router = require('express').Router()
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const  {createCategoryCtlr, getAllCategoryCtlr, deleteCategoryCtlr }= require('../controllers/categoryController')
const validateObjectId = require('../middlewares/validateObjectId')


// /api/categories
router.route("/")
    .post(verifyTokenAndAdmin,createCategoryCtlr)
    .get(getAllCategoryCtlr);

// api/categories/:id
router.route("/:id")
    .delete(validateObjectId,verifyTokenAndAdmin,deleteCategoryCtlr)

module.exports = router;