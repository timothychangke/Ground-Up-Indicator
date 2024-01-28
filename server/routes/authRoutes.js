const express = require('express');
const router = express.Router();
const cors = require('cors');
const { loginUser, registerUser, getProfile } = require('../controllers/authController');

//change according to port you run on
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5178',
    })
);

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/profile', getProfile)

module.exports = router;
