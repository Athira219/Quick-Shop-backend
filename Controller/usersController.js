//import schema
const users = require('../Model/userSchema')
const jwt = require('jsonwebtoken')

//------------------------Register------------------------------//
exports.register = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const existingRegister = await users.findOne({ email })
        if (existingRegister) {
            res.status(406).json('Account already exist... Please Login ')
        } else {
            const newuser = new users({
                username, email, password
            })
            await newuser.save()
            res.status(200).json(newuser)
        }

    }
    catch (err) {
        res.status(401).json(`${err}`)
    }
}
//---------------------------LOGIN---------------------------------//
exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.key)
            res.status(200).json({ existingUser, token })
            console.log('existingUser=', existingUser);

        } else {
            res.status(406).json('Invalid Email & Password')
        }
    }
    catch (err) {
        res.status(401).json(`${err}`)
    }

}