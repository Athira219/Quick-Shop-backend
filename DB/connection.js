//import mongoose
const mongoose = require('mongoose')

//get the connection string
const connectionString = process.env.ecommerceDatabase
console.log(connectionString);


mongoose.connect(connectionString).then(()=>{
    console.log('server connected successfully with mongoDB');
}).catch((err)=>{
    console.log(`ERROR${err}`);

})