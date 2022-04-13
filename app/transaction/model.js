const mongoose = require('mongoose')

let transactionSchema = mongoose.Schema({
  historyTreatment :{
    queue : { type : String, require: [true, 'nama antrean harus diisi.']},
    treatment : { type : String, require: [true, 'Treatment harus diisi.']},
    price : { type : Number },
  },

  historyPayments : {
    name : { type : String, require: [true, 'nama harus diisi.']},
    type : { type : String, require: [true, 'tipe pembayaran harus diisi.']},
    bankName : { type : String, require: [true, 'nama bank harus diisi.']},
    noRekening : { type : String, require: [true, 'nomor rekening harus diisi.']},
  },

  name : {
    type : String,
    require :[true, "nama harus diisi"],
    maxlength :[225, "panjang nama harus antara 3 - 225 karakter"],
    minlength :[3, "panjang nama harus antara 3 - 225 karakter"]
  },

  accountUser : {
    type : String,
    require :[true, "nama akun harus diisi"],
    maxlength :[225, "panjang nama harus antara 3 - 225 karakter"],
    minlength :[3, "panjang nama harus antara 3 - 225 karakter"]
  },

  tax :{
    type : Number,
    default: 0,
  },
  total : {
    type : Number,
    default : 0
  },

  value : {
    type : Number,
    default : 0
  },

  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },

  patient  : 
  [{type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  }],
  treatment  : 
  [{type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment'
  }],
    


  historyUser  : {
    name : { type : String, require: [true, 'nama player harus diisi.']},
    phoneNumber : {
      type : Number,
      require :[true, "nama akun harus diisi"],
      maxlength :[13, "panjang nama harus antara 9 - 13 karakter"],
      minlength :[9, "panjang nama harus antara 9 - 13 karakter"]
    }
  },
  
  queue  : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Que'
  },
  user  : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminFee: {
    type : Number,
    default : 0
  }

  
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)
