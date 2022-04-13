const mongoose = require('mongoose')

let treatmentSchema = mongoose.Schema({
treatmentType: {
    type: String,
    require: [true, 'Nama pemilik harus diisi']
},
  queue : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Que'
},

price: {
  type: Number,
  require: [true, 'Nama bank harus diisi']
},
user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}, 


}, { timestamps: true })

module.exports = mongoose.model('Treatment', treatmentSchema)