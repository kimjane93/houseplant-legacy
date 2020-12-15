const User = require('../models/user')
const Houseplant = require('../models/houseplant')

module.exports = {
    myProfile,
    index,
    addBio,
    myPlants,
    addPlantToCollection,
}

function myProfile(req, res){
    User.findById(req.user._id)
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

function addPlantToCollection(req, res){
    User.findById(req.user._id, function(error, user){
        console.log(req.body.plantCollection)
        user.plantCollection.push(req.body.plantCollection)
        user.save(function(){res.redirect('/users/profile')})
    })
}


function myPlants(req, res){
    User.findById(req.user._id)
    .populate("plantCollection")
    .then((user)=>{
        res.render('users/personalcollection', {title: 'My Plant Collection', user})
    })
}