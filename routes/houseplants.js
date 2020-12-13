const router = require('express').Router()
const houseplantsCtrl = require('../controllers/houseplants')

router.get('/', isLoggedIn, houseplantsCtrl.index)
router.get('/new', isLoggedIn, isAdmin, houseplantsCtrl.new)
router.post('/new', isLoggedIn, isAdmin, houseplantsCtrl.create)


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }
  
function isAdmin(req, res, next){
    if(req.user.email === "kjchadwell93@gmail.com") return next()
    res.redirect('/houseplants')
}

module.exports = router