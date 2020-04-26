const mongoose = require("mongoose");
const Token = mongoose.model("Token");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/keys");

module.exports = (user) => {
    const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
    const verifyToken = new Token({
        userId: user._id,
        token: token
    });
    return verifyToken.save();
}
