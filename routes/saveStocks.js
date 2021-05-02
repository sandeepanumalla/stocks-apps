const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(express.urlencoded({extended:false}));
router.use(express.json());
const { urlencoded } = require('body-parser');

router.get('/hello',(res,req)=>{
    res.send('heloo world')
})



module.exports = router;