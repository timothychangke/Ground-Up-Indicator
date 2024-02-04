const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/auth');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: 'name is required',
            });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password should be at least 6 characters long',
            });
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'email is taken',
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        return res.json(user);
    } catch (err) {
        console.log(err);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found',
            });
        }
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.json({
                error: 'Password incorrect! Try again',
            });
        }
        const token = jwt.sign(
            { email: user.email, id: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );
        res.cookie('token', token).json(user)
        return res.json({ accessToken: accessToken });
    } catch (err) {
        console.log(err);
    }
};

const getProfile = (req, res) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

module.exports = {
    loginUser,
    registerUser,
    getProfile,
};
