const mongoose = require('mongoose');
const therapistScheme = mongoose.Schema({
    therapistName : {
        type : String,
        require :[true , 'You must enter name']
    },
    therapistAge :{
        type : Number,
        require :[true , 'You must enter age']
    },
    therapistGender:{
        type : String,
        require :[true , 'You must enter gender']
    },
    therapistpPhoneNumber:{
        type : Number,
        require :[true , 'You must enter phone number']
    },
    patient:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'EMR'

    }
             
},{ timestamps: true })

module.exports = mongoose.model('Therapist',therapistScheme) 