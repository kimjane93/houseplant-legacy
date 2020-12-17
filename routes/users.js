const router = require('express').Router()
const usersCtrl = require('../controllers/users')

router.get('/profile', isLoggedIn, usersCtrl.myProfile)
router.get('/', isLoggedIn, usersCtrl.index)
router.put('/profile', isLoggedIn, usersCtrl.addBio)
router.get('/profile/personalcollection', isLoggedIn, usersCtrl.myPlants)
router.post('/profile/personalcollection', isLoggedIn, usersCtrl.addPlantToCollection)
router.get('/profile/personalcollection/:id', isLoggedIn, usersCtrl.plantdetail)
router.get('/profile/personalcollection/:id/edit', isLoggedIn, usersCtrl.edit)
router.put('/profile/personalcollection/:id/', isLoggedIn, usersCtrl.update)
router.get('/:id', isLoggedIn, usersCtrl.show)
router.get('/:id/usercollection', isLoggedIn, usersCtrl.theirPlants)
router.delete('/profile/personalcollection', isLoggedIn, usersCtrl.delete)



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }

module.exports = router