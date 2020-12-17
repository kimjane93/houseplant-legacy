const User = require('../models/user')
const Houseplant = require('../models/houseplant')

module.exports = {
    myProfile,
    index,
    addBio,
    myPlants,
    addPlantToCollection,
    show,
    theirPlants,
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
        Houseplant.findById(req.body.plantCollection)
        .then((houseplant)=>{
            houseplant.userDetails.push({
                owner: req.user._id,
                shareable: false,
            })
            houseplant.Ownedby.push(req.user._id)
            houseplant.save()
        })
        user.plantCollection.push(req.body.plantCollection)
        user.save(function(){res.redirect('/users/profile/personalcollection')})
    })
}

function myPlants(req, res){
    User.findById(req.user._id)
    .populate("plantCollection")
    .then((user)=>{
        res.render('users/personalcollection', {title: 'My Plant Collection', user})
    })
}

function show(req, res){
    User.findById(req.params.id)
    .then((user)=>{
        res.render('users/show', {title: `${user.name}'s Profile`, user })
    })
}

function theirPlants(req, res){
    User.findById(req.params.id)
    .populate('plantCollection')
    .then((user)=>{
        res.render('users/usercollection', {title: `${user.name}'s Houseplant Collection`, user})
    })
}