const User = require('../models/user')

module.exports = {
    myProfile,
    index,
    addBio,
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


function addBio(req, res){
    User.findByIdAndUpdate(req.user._id, req.body, {new: true})
    .then(()=>{
        res.redirect('/users/profile')
    })
}