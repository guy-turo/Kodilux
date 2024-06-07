const mongoose = require('mongoose')

const schema = mongoose.Schema

const UserSchema = new schema({
    firstName: { type: String, },
    lastName: { type: String },
    email: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },

}, { timeStamp: true })

const userModel = new mongoose.model("User", UserSchema)

module.exports = { userModel }