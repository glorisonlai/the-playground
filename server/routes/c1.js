var express = require('express');
var router = express.Router();

router.post('/c1', function(req, res, next) {
  console.log(req.body);
  if (req.body.msg == process.env.BG_1) {
    res.send({success:true});
  }
  else {
    res.send({success:false});
  }
});

router.post('/c2', function(req, res) {
  if (req.body.msg == process.env.BG_2) {
    res.send({success:true});
  }
  else {
    res.send(req.body.msg);
  }
})

module.exports = router;