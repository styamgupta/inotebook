const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true"

const connectToMongosatyam = ()=>{
    mongoose.connect(mongoURI, {
    
    })
}

  
module.exports = connectToMongosatyam;