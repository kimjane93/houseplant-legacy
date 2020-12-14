const mongoose = require('mongoose')
const Schema = mongoose.Schema

const houseplantSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    Ownedby: [{type: Schema.Types.ObjectId, ref: "User"}],
    shareable: {type: Boolean, default: false}
},{
    timestamps: true
})

module.exports = mongoose.model('Houseplant', houseplantSchema)
