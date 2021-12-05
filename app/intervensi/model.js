const mongoose = require('mongoose');
const intervensiSchema = mongoose.Schema({
    intervensiName : {
        type : String,
        require :[true , 'You must enter intervensi']
    }
            
},{ timestamps: true })

module.exports = mongoose.model('Intervensi',intervensiSchema) 