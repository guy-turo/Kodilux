const mongoose = require("mongoose")

const connectDB = async(uri) => {
    try {
        const connect = await mongoose.connect(uri, {})
        if (connect) {
            console.log('connect db')
            return connect
        } else {
            console.log('Try again something went wrong on connecting db')
        }
    } catch (error) {
        return console.error(`error message ${error.message}`)
    }
}
const uriLocal = "mongodb://localhost:27017/searchEngine";
module.exports = { connectDB, uriLocal }