const mongoose = require('mongoose');
let recommendationSchema = mongoose.Schema({
    emr : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EMR'
        // type : String
    },
    recommend :{
        type : String,
        require :[true , 'You must enter recommendation']
    },
    date:{
        type : Date,
        require :[true , 'You must enter date']
    },
    status:{
        type : String,
        enum : ['Y' , 'N'],
        default : 'Y'
    },
    therapist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist'
    }
             
},{ timestamps: true })

module.exports = mongoose.model('Recommendation',recommendationSchema) 