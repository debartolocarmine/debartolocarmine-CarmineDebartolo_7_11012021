const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = function uid(hdrs) {
    // console.log('hdrs', hdrs)
    const token = hdrs.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ASK_TOKEN);
    const uid = decodedToken.uid;
    return uid;
};