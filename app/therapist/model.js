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

    },
    handled:{
        type : Number,
        default: 0

    },
    // status: {
    //     type: String,
    //     enum: ['Y', 'N'],
    //     default: 'Y'
    //   },
             
},{ timestamps: true })

module.exports = mongoose.model('Therapist',therapistScheme) 