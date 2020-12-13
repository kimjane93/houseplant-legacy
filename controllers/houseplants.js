const Houseplant = require('../models/houseplant')


module.exports = {
    index,
    new: newHouseplant
}

function index(req, res){
    Houseplant.find({})
    .then((houseplants)=>{
        res.render('houseplants/index', {title: 'Plants in Rotation', user: req.user, houseplants: houseplants})
    })
}

function newHouseplant(req, res){
    res.render('houseplants/new', {title: 'Add Houseplant To Rotation', user: req.user})
}
