const Message = require('../models/message')

module.exports = {
    index, 
    create,
    show,
    respond,
}

function index(req, res){
    Message.find({})
    .populate('postedBy')
    .then((messages)=>{
        res.render('messages/index', {user: req.user, title: 'Plant Pal Message Board', messages: messages.reverse()})
    })
    .catch((err)=>{
        console.log(err)
    })
}

function create(req, res){
    Message.create(req.body)
    .then(()=>{
        res.redirect('/messages')
    })
    .catch((err)=>{
        console.log(err)
    })
}

function show(req, res){
    Message.findById(req.params.id)
    .populate('postedBy')
    .then((message)=>{
        res.render('messages/show', {title: req.user, user: req.user, message: message})
    })
    .catch((err)=>{
        console.log(err)
    })
}

function respond(req, res){
    Message.findById(req.params.id)
    .then((message)=>{
       message.replies.push(req.body)
        message.save()
        .then(()=>{
            res.redirect(`/messages/${message._id}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
}