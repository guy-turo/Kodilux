const crypto = require('crypto');

// Specify the desired key length in bytes (32 bytes is a common choice for strong security)
const keyLength = 32;

// Generate random bytes and convert to hexadecimal string (hex is a common format)
crypto.randomBytes(keyLength, (err, buffer) => {
    if (err) {
        throw err;
    }
    const secretKey = buffer.toString('hex');
    console.log('Generated Secret Key:', secretKey);
});