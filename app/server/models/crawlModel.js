const mongoose = require('mongoose');
const schema = mongoose.Schema

const linksSchema = new schema({
    url: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        require: true,
    },
    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pages"
    }
}, { timestamp: true })

const linkModel = new mongoose.model('Links', linksSchema)
module.exports = { linkModel }