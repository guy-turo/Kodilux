const express = require('express')
require('express-async-errors')
require('dotenv').config()
const bodyParser = require('body-parser')
const connect = require('./db/connect')

const cors = require('cors')
const app = express()

const version = '/api/v1/'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const start = async() => {
    const port = process.env.PORT || 8000
    try {
        await connect.connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        const msgError = error.message
        console.log(msgError)
    }
}

start()