const jwt = require('jsonwebtoken');


//Verify Token
function verifyToken(req,res, next){
    const authToken = req.headers.authorization;
    if(authToken){
        const token = authToken.split(' ')[1];
        try {
            const decodePayload =jwt.verify(token,process.env.JWT_SECRET);
            req.user = decodePayload;
            next();
        } catch (error) {
            return res.status(401).json({message : "invalid token , acces denied"})
        }
    }else{
        return res.status(401).json({message : "no token provided , acces denied"})
    }
}


//Verify Token & Admin
function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message : "not allowed, only admin"})
        }
    })
}
//Verify Token & Only User Himself
function verifyTokenAndOnluUser(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id){
            next();
        }else{
            return res.status(403).json({message : "not allowed, only user himself"})
        }
    })
}

//Verify Token & Authorization 
function verifyTokenAndAuthorization(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message : "not allowed, only user himself or admin"})
        }
    })
}
module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnluUser,
    verifyTokenAndAuthorization
    }