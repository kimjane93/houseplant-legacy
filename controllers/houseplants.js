const Houseplant = require('../models/houseplant')
const User = require('../models/user')


module.exports = {
    index,
    new: newHouseplant,
    create,
    goToStore,
}

function index(req, res){
    Houseplant.find({})
    .populate("Ownedby")
    .then((houseplants)=>{
        res.render('houseplants/index', {title: 'Plants in Rotation', user: req.user, houseplants: houseplants})
    })
}

function newHouseplant(req, res){
    res.render('houseplants/new', {title: 'Add Houseplant To Rotation', user: req.user})
}

function create(req, res){
    Houseplant.create(req.body)
    .then(()=>{
        res.redirect('/houseplants/new')
    })
}

function goToStore(req, res){
    Houseplant.find({})
    .populate('Ownedby')
    .then((houseplants)=>{
        let randomNum = Math.floor(Math.random() * houseplants.length)
        console.log(houseplants[randomNum])
        res.render('houseplants/plantshop', {title: 'Welcome To The Plant Shop', user: req.user, houseplant: houseplants[randomNum]})
    })
}


