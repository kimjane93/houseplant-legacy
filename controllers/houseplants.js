const Houseplant = require('../models/houseplant')


module.exports = {
    index,
}

function index(req, res){
    Houseplant.find({})
    .then((houseplants)=>{
        res.render('houseplants/index', {title: 'Plants in Rotation', user: req.user, houseplants: houseplants})
    })
}

