const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let CourseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    syllabus : {
        type : String,
        required : true
    },
    material : {
        type : String,
        required : false
    },
    faculty : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Faculty',
        required : true
    },
    tutor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

CourseSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Course", CourseSchema);