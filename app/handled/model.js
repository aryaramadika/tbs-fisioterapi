const mongoose = require('mongoose')

let handledSchema = mongoose.Schema({
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist'
  },
  emr : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EMR'
    // type : String
  },
  quantityHandled:{
      type : Number,
      default:0,
  },
  status: {
    type: String,
    enum: ['working', 'resting'],
    default: 'work'
  },

}, { timestamps: true })

module.exports = mongoose.model('Handled', handledSchema)
