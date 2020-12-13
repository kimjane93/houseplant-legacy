const mongoose = require('mongoose')
const Schema = mongoose.Schema


const shareSchema = new Schema ({
    share: {type: Boolean, required: true}
},{
    timestamps: true
})

const houseplantSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    imageUrl: String,
    Ownedby: [{type: Schema.Types.ObjectId, ref: "User"}],
    shareable: [shareSchema]
},{
    timestamps: true
})

module.exports = mongoose.model('Houseplant', houseplantSchema)
