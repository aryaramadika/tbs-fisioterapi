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
        type : String,
        require :[true , 'You must enter phone number']
    },
            
},{ timestamps: true })

module.exports = mongoose.model('Therapist',therapistScheme) 