
const jwt = require('jsonwebtoken')

const jwtMiddleWare = (req,res,next)=>{

    console.log('jwt widdleware');
    const token = req.headers['authorization'].split(" ") [1]
    console.log(token);
    try{
        const jwtResponse = jwt.verify(token,process.env.key)
        console.log('jwtResponse=',jwtResponse);

        req.payload = jwtResponse.userId
        console.log('userId=',req.payload);
        next()

    }
    catch(err){
        res.status(401).json('Authorization Failed...Please login')
    }

}
module.exports = jwtMiddleWare