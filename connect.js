const mongoose = require('mongoose') ; 

const connectToMongo = async (url) => {
return mongoose.connect(url);
}

module.exports = {
    connectToMongo,
}