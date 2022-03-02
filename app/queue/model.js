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
    // date:{
    //     type: Date
    // },
    status:{
        type : String,
        enum : ['ongoing' , 'treated', 'pending'],
        default : 'pending'
    },
        
    
},{ timestamps: true })

module.exports = mongoose.model('Que',queScheme) 