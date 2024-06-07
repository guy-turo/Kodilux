function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
}

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
}

function isValidPassword(password) {
    if (!password || typeof password !== 'string') {
        return false;
    }
    const minLength = 8;
    if (password.length < minLength) {
        return false;
    }
    const regex = /(?=.*\d)(?=.*[^a-zA-Z\d])/g;
    const hasNumberAndSymbol = regex.test(password);
    return hasNumberAndSymbol;
}

module.exports = { isValidEmail, isValidPassword, generateAccessToken }