const User = require('../models/user')

module.exports = {
    myProfile,
    index, 
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

function index(req, res){
    User.find({})
    .then((users)=>{
        res.render('users/index', {title: 'Other Plant Pals!', users: users, user: req.user})
    })
}