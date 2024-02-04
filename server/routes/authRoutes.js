const express = require('express');
const router = express.Router();
const cors = require('cors');
const { loginUser, registerUser, getProfile } = require('../controllers/authController');
const {createNature, getAllNature, getSingleNature,deleteAllNature,deleteSingleNature} =require("../controllers/natureController")
//change according to port you run on
router.use(
    cors({
        credentials: true,
        origin: `http://localhost:3000`,
    })
);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);

router.route('/tracker').post(createActivity).get(getActivity).delete(deleteActivity);

module.exports = router;
