const Message = require('../models/message')

module.exports = {
    index, 
    create,
    show,
    respond,
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

function create(req, res){
    req.body.postedBy = req.user.name
    req.body.avatar = req.user.avatar
    Message.create(req.body)
    .then(()=>{
        res.redirect('/messages')
    })
}

function show(req, res){
    Message.findById(req.params.id)
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
        req.body.postedBy = req.user.name
        req.body.avatar = req.user.avatar
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