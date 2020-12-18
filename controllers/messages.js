const Message = require('../models/message')

module.exports = {
    index, 
}

function index(req, res){
    Message.find({})
    .then((messages)=>{
        res.render('messages/index', {user: req.user, title: 'Plant Pal Message Board', messages: messages.reverse()})
    })
    .catch((err)=>{
        console.log(err)
    })
}