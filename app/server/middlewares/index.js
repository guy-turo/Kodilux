require("dotenv").config()
    // const jwt = require("jsonwebtoken")
module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({ message: "You are not authorized to view this resource" })
    }
}
module.exports.isAdmin = (req, res, next) => {
        if (req.isAuthenticated() && req.user.admin) {
            next()
        } else {
            res.status(401).json({ message: "You are not authorized to view this resource" })
        }
    }
    // module.exports.authenticateToken = (req, res, next) => {
    //     const authHeader = req.headers.authorization
    //     console.log("checking...")
    //     if (authHeader && authHeader.startsWith("Bearer ")) {

//         const token = authHeader.split(" ")[1]
//         console.log(token)
//         try {
//             const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//             req.user = decode
//             console.log(req.user)
//             if (req.user && req.user.admin === true) {
//                 console.log("pass")
//                 next()
//             } else {
//                 return res.status(401).json({ message: "You are not authorized to view this resource" })
//             }
//         } catch (error) {
//             if (error.name === 'TokenExpiredError') {
//                 return res.status(401).json({ message: "Unauthorized: Token expired" })
//             }
//             return next(error)
//         }
//     } else {
//         return res.status(401).json({ message: "Unauthorized : Missing token" })
//     }
// }