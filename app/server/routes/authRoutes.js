const authRoutes = require('express').Router()
const { token, login, signup, logout, recover, checkAuth } = require("../controllers/authController")
    // const { authenticateToken } = require('../middlewares/index')

// authRoutes.post("/login", passport.authenticate('local'), login)
authRoutes.post("/login", login)
authRoutes.route("/signup")
    .post(signup)

authRoutes.post("/token", token)
authRoutes.route("/logout").put(logout)
    // authRoutes.get("/checkAuth", authenticateToken, checkAuth)


authRoutes.route("/recover")
    .get(recover)

module.exports = { authRoutes }