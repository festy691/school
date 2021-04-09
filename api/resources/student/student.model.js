const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let StudentSchema = new mongoose.Schema({
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course',
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    session : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Session',
        required : true
    },
    coursework : {
        type : Number
    },
    exam : {
        type : Number
    },
    grade : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

StudentSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Student", StudentSchema);