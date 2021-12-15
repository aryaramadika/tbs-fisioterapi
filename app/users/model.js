const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

let userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: [true, 'email harus diisi']
  },
  name: {
    type: String,
    require: [true, 'nama harus diisi']
  },
  password: {
    type: String,
    require: [true, 'kata sandi harus diisi']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin' 
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  phoneNumber: {
    type: String,
    require: [true, 'nomor telpon harus diisi']
  },

}, { timestamps: true })

userSchema.plugin(uniqueValidator,{message:'email sudah digunakan'})
module.exports = mongoose.model('User', userSchema)
