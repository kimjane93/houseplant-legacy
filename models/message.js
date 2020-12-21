const mongoose = require('mongoose')
const Schema = mongoose.Schema

const replySchema = new Schema({
  message: String,
  postedBy: String,
  postedById: String,
  avatar: String,
}, {
  timestamps: true
})

const messageSchema = new Schema({
  postedBy: [{type: Schema.Types.ObjectId, ref: 'User'}],
  title: String,
  replies: [replySchema]
}, {
  timestamps: true
})

module.exports = mongoose.model("Message", messageSchema)




// postedBy: String,
// avatar: String,