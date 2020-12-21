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
    plantdetail,
    edit,
    update,
    delete: deletePlant,
}

function myProfile(req, res){
    User.findById(req.user._id)
    .then((user)=>{
        res.render('users/profile', {title: 'My Profile', user: user})
    })
    .catch((err)=>{
        console.log(err)
    })
}

function index(req, res){
    User.find({})
    .then((users)=>{
        res.render('users/index', {title: 'Other Plant Pals!', users: users, user: req.user})
    })
    .catch((err)=>{
        console.log(err)
    })
}


function addBio(req, res){
    User.findByIdAndUpdate(req.user._id, req.body, {new: true})
    .then(()=>{
        res.redirect('/users/profile')
    })
    .catch((err)=>{
        console.log(err)
    })
}

function addPlantToCollection(req, res){
    User.findById(req.user._id, function(error, user){
        if(user.plantCollection.includes(req.body.plantCollection)){
            res.redirect('/users/profile/personalcollection')
        } else {
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
    }
    })
}

function myPlants(req, res){
    User.findById(req.user._id)
    .populate("plantCollection")
    .then((user)=>{
        res.render('users/personalcollection', {title: 'My Plant Collection', user})
    })
    .catch((err)=>{
        console.log(err)
    })
}

function show(req, res){
    User.findById(req.params.id)
    .then((user)=>{
        res.render('users/show', {title: `${user.name}'s Profile`, user, currentUser: req.user })
    })
    .catch((err)=>{
        console.log(err)
    })
}

function theirPlants(req, res){
    User.findById(req.params.id)
    .populate('plantCollection')
    .then((user)=>{
        res.render('users/usercollection', {title: `${user.name}'s Houseplant Collection`, user, currentUser: req.user})
    })
    .catch((err)=>{
        console.log(err)
    })
}


function plantdetail(req, res){
    Houseplant.findById(req.params.id)
    .then((houseplant)=>{
        res.render('users/plantdetail', {title: `${houseplant.name}'s Details Page`, houseplant, user: req.user})
    })
    .catch((err)=>{
        console.log(err)
    })
  }

function edit(req, res){
    Houseplant.findById(req.params.id)
    .then((houseplant)=>{
        res.render('users/edit', {title: `Change Shareability Of Your ${houseplant.name}`, houseplant, user: req.user})
    })
    .catch((err)=>{
        console.log(err)
    })
}

function update(req, res){
    Houseplant.findById(req.params.id)
    .then((houseplant)=>{
        houseplant.userDetails.forEach((d)=>{
            if(d.owner == req.user._id){
                d.shareable = !!req.body.shareable
            }
        })
        houseplant.save()
        res.redirect(`/users/profile/personalcollection/${houseplant._id}`)
    })
    .catch((err)=>{
        console.log(err)
    })
}

function deletePlant(req, res){
    User.findById(req.user._id)
    .then((user)=>{
        let idx = user.plantCollection.indexOf(req.body.plantid)
        user.plantCollection.splice(idx, 1)
        user.save()
        Houseplant.findById(req.body.plantid)
        .then((houseplant)=>{
            let idx = houseplant.Ownedby.indexOf(req.user._id)
            houseplant.Ownedby.splice(idx, 1)
            let detailIdx = houseplant.userDetails.indexOf(houseplant.userDetails.owner == req.body.owner)
            houseplant.userDetails.splice(detailIdx, 1)
            houseplant.save()
        })
        res.redirect('/users/profile/personalcollection')
    })
}