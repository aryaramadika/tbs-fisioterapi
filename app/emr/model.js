const mongoose = require('mongoose');
const emrScheme = mongoose.Schema({
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
    job : {
        type : String,
        require :[true , 'You must enter job']
    },
    hospitalData:{
        type : String
    },    
    primaryComplain:{
        type : String
    },
    famHistory:{
        type : String
    },
    medHistory:{
        type : String
    },
    vitalExam:{
        type : String
    },
    inspection:{
        type : String
    },
    palpation:{
        type : String
    },
    percussion:{
        type : String
    },
    auscultation:{
        type : String
    },
    functionCheck:{
        type : String
    },
    specificInspect:{
        type : String
    },
    diagnosis:{
        type : String,
        require :[true , 'You must enter diagnosis']
    },
    plan:{
        type : String,
        require :[true , 'You must enter Physiotherapy Plan']
    },intervensi1:{
        type : String
    },intervensi2:{
        type : String
    },intervensi3:{
        type : String
    },intervensi4:{
        type : String
    },intervensi5:{
        type : String
    },intervensi6:{
        type : String
    },intervensi7:{
        type : String
    },therapist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist'
    },date:{
        type: Date
    }
        
    
},{ timestamps: true })

module.exports = mongoose.model('EMR',emrScheme) 