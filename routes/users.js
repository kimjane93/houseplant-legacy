const router = require('express').Router()
const usersCtrl = require('../controllers/users')

router.get('/profile', isLoggedIn, usersCtrl.myProfile)
router.get('/index', isLoggedIn, usersCtrl.index)
router.put('/profile', isLoggedIn, usersCtrl.addBio)
router.get('/profile/personalcollection', isLoggedIn, usersCtrl.myPlants)
router.put('/profile/personalcollection', isLoggedIn, usersCtrl.addPlantToCollection)



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }

module.exports = router