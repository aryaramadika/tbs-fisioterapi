const mongoose = require('mongoose')

let handlingSchema = mongoose.Schema({
    emrs : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EMR'
    },
    therapists: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist'
    },
    quantity: {
        type: Number,
        require: [true, 'quantity harus diisi']
    },

}, { timestamps: true })

module.exports = mongoose.model('Handling', handlingSchema)