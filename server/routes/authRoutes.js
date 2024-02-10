const express = require('express');
const router = express.Router();
const cors = require('cors');
const { loginUser, registerUser, getProfile } = require('../controllers/authController');
const {createNature, getAllNature, getSingleNature,deleteAllNature,deleteSingleNature} =require("../controllers/natureController")
const {createActivity, getActivity,deleteActivity} = require('../controllers/trackerController')
const {updateScores, getAllScores,getScores} = require('../controllers/scoreController')
const {getReflection,postReflection} = require('../controllers/nlpScoreController')


//change according to port you run on
router.use(
    cors({
        credentials: true,
        origin: `https://gui-hack4good.onrender.com`,
    })
);


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);

router.route('/tracker').post(createActivity).get(getActivity).delete(deleteActivity);

router.post('/nature', createNature);
router.get('/nature', getAllNature)
router.get('/nature/:id', getSingleNature)
router.delete('/nature/:id', deleteSingleNature)
router.delete('/nature', deleteAllNature)
router.patch('/score', updateScores);
router.get('/score', getScores)

router.get('/reflection',getReflection)
router.post('/reflection', postReflection)
router.get('/allscore',getAllScores)

module.exports = router;
