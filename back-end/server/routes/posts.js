var express = require('express');
var router = express.Router();

router.get('/title/:id', function(req, res, next) {
    res.json({ title: 'title-' + req.params.id });
});

module.exports = router;
