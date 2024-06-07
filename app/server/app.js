const express = require('express')
const mongoose = require('mongoose')
const session = require("express-session")
require('express-async-errors')
require('dotenv').config()
const bodyParser = require('body-parser')
const { connectDB } = require('./db/connect')
const MongoStore = require('connect-mongo')

const { authRoutes } = require('./routes/authRoutes')

const cors = require('cors')
const app = express()

const version = '/api/v1/'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const sessionStorage = new MongoStore({
    mongoUrl: process.env.MONGO_URI,
    mongooseConnection: mongoose.connection,
    // collection: 'sessions',
})
app.use(session({
    secret: "",
    resave: false,
    saveUninitialized: true,
    store: sessionStorage,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(`${version}auth`, authRoutes)

const start = async() => {
    const port = process.env.PORT || 8000
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        const msgError = error.message
        console.log(msgError)
    }
}

start()