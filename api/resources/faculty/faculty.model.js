const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let FacultySchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default : null
    },
    departments : {
        type : [String],
        default : null
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phonenumber : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

FacultySchema.plugin(mongosePaginate);
module.exports = mongoose.model("Faculty", FacultySchema);