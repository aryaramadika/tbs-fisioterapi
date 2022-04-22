const mongoose = require('mongoose');
const queScheme = mongoose.Schema({
    name : {
        type : String,
        require :[true , 'You must enter name']
    },
    age :{
        type : Number,
        require :[true , 'You must enter age']
    },
    gender:{
        type : String,
        require :[true , 'You must enter gender']
    },
    address:{
        type : String,
        require :[true , 'You must enter address']
    },
    phoneNumber : {
        type : String,
        require :[true , 'You must enter job']

    },
    lementation:{
        type: String,
        require :[true , 'You must enter lementation']
    },
    // date:{
    //     type: Date
    // },
    status:{
        type : String,
        enum : ['ongoing' , 'treated', 'pending'],
        default : 'pending'
    },
    time:{
        type: Date,
        require : [true , 'You must choose date treatment']
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'    
    },
    treatment  : 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treatment'
    },
        
    
},{ timestamps: true })

module.exports = mongoose.model('Que',queScheme) 