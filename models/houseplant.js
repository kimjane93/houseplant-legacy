const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userDetailsSchema = new Schema ({
    owner: String,
    shareable: {type: Boolean, default: false},
})


const houseplantSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    Ownedby: [{type: Schema.Types.ObjectId, ref: "User"}],
    userDetails: [userDetailsSchema]
},{
    timestamps: true
})

module.exports = mongoose.model('Houseplant', houseplantSchema)
