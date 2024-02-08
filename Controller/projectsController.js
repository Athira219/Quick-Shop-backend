const projects = require('../Model/projectSchema')

//------------GET ALL PRODUCT--------------------//

exports.allProduct  = async (req, res) => {

    try {
        const ecomerceAllProduct = await projects.find()
        res.status(200).json(ecomerceAllProduct)
        // console.log(ecomerceAllProduct);
    }
    catch (err) {
        res.status(401).json(`${err}`)
    }
}
//------------GET A PRODUCT--------------------//
exports.getAProduct = async(req,res)=>{
    const {id} = req.params
    // console.log(id);
    try{
       const product = await projects.find({id}) 
       res.status(200).json(product)

    }catch(err){
        res.status(401).json(`${err}`)

    }

}