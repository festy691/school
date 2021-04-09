const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let AttendanceSchema = new mongoose.Schema({
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course',
        required : true
    },
    topic : {
        type : String,
        required : true
    },
    student : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'User',
        required : false
    },
    lecturer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    session : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Session',
        required : true
    },
    attendanceToken : {
        type : String
    },
    attendanceExpire : {
        type : Date
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

AttendanceSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Attendance", AttendanceSchema);