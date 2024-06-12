const bcrypt = require('bcrypt')
const { userModel } = require('../models/userModel')
const { isValidEmail, isValidPassword } = require('../utility/helper')
require('dotenv').config()

const checkAuth = async(req, res) => {}
const token = async(req, res) => {}
const login = async(req, res) => {
    console.log('hello login')
}
const signup = async(req, res) => {}
const recover = async(req, res) => {
    res.send('recover')
}
const logout = async(req, res) => {}

module.exports = {
    checkAuth,
    token,
    login,
    signup,
    recover,
    logout,
}