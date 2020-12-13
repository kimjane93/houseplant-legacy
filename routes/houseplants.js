const router = require('express').Router()
const houseplantsCtrl = require('../controllers/houseplants')

router.get('/', isLoggedIn, houseplantsCtrl.index)


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }
  

module.exports = router