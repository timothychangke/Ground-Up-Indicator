const express = require('express');
const router = express.Router();
const cors = require('cors');
const {createNature, getAllNature, getSingleNature,deleteAllNature,deleteSingleNature} =require("../controllers/natureController")
//change according to port you run on
router.use(
    cors({
        credentials: true,
        origin: `http://localhost:3000`,
    })
);

router.post('/nature', createNature);
router.get('/nature', getAllNature)
router.get('/nature/:id', getSingleNature)
router.delete('/nature/:id', deleteSingleNature)
router.delete('/nature', deleteAllNature)

module.exports = router;
