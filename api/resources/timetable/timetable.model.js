const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let ClassSchema = new mongoose.Schema({
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course',
        required : true
    },
    startTime : {
        type : Date,
        required : true
    },
    endTime : {
        type : Date,
        required : true
    }
});

let TimetableSchema = new mongoose.Schema({
    monday : {
        type : [ClassSchema],
    },
    tuesday : {
        type : [ClassSchema],
    },
    wednesday : {
        type : [ClassSchema],
    },
    thursday : {
        type : [ClassSchema],
    },
    friday : {
        type : [ClassSchema],
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    }
});

TimetableSchema.plugin(mongosePaginate);
module.exports = mongoose.model("TimeTable", TimetableSchema);