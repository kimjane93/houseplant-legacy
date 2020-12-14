const User = require('../models/user')

module.exports = {
    myProfile,
}

function myProfile(req, res){
    User.findById(req.user._id)
    .populate("plantCollection")
    .then((user)=>{
        res.render('users/profile', {title: 'My Profile', user: user})
    })
    .catch((err)=>{
        res.redirect('/')
    })
}