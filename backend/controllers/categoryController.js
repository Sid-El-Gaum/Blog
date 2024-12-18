const asyncHandler = require('express-async-handler');
const {Category ,validateCreateCategory}= require('../models/Category');


/**----------------------------------------
* @desc    Creae New Category
* @route   /api/category
* @method  POST
* @access  private  (only admin)
-------------------------------------------*/
module.exports.createCategoryCtlr = asyncHandler(async(req,res)=>{
    const {error}= validateCreateCategory(req.body);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    }

    const category = await Category.create({
        title: req.body.title,
        user: req.body.id,
    });
    res.status(201).json(category);
})

/**----------------------------------------
* @desc    Get All Category
* @route   /api/category
* @method  GET
* @access  public
-------------------------------------------*/
module.exports.getAllCategoryCtlr = asyncHandler(async(req,res)=>{
    const categories = await Category.find();
    res.status(200).json(categories);
})

/**----------------------------------------
* @desc    Delete Category
* @route   /api/categories/:id
* @method  DELETE
* @access  private  (only admin)
-------------------------------------------*/
module.exports.deleteCategoryCtlr = asyncHandler(async(req,res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        return res.status(404).json({message : "category not found"});
    }

    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({message: " categoty has been deleted successfully" ,
            categoryId: category._id,
        });
    
    
})