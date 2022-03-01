const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authUser = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'appSecret');
        const user = await User.findOne({
            _id: decoded.id,
        });
        if(!user) throw new Error("Please authorize!");
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({error: e.message});
    }
}

module.exports = authUser;