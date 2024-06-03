const mongoose = require('mongoose');
const schema = mongoose.Schema

const pageSchema = schema({
    title: {
        type: String,
    },
    url: {
        type: String,
        require: true,
    },
    images: {
        type: Array,
    },
    content: {
        type: Array,

    },
    links: {
        type: Array,
    },
    status: {
        type: Boolean,
    }
}, { timestamp: true })

const pageModel = new mongoose.model('Page', pageSchema)
module.exports = { pageModel }