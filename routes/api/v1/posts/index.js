const express = require('express');
const router = express.Router();

//Endpoint posts
router.get('/', (req, res) => {
    res.send('Posts page');
})

module.exports = router;