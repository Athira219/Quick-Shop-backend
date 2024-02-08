//import dotenv
require('dotenv').config()

//import express
const express = require('express')

///import cors
const cors = require('cors')

// creating server using express
const eComeerceServer = express()

//use of cors by server
eComeerceServer.use(cors())

//import router
const router = require('./Routing/router')
//import connection.js
require('./DB/connection')

eComeerceServer.use(express.json())

eComeerceServer.use(router)

//customize port
const port = 3000 || process.env.port

/* run server  */
eComeerceServer.listen(port,()=>{
    console.log(`e-commerce server is running at ${port}`);
})

