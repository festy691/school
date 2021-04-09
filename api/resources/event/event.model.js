const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let EventSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : false
    },
    faculty : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Faculty',
        required : true
    },
    eventDate : {
        type : Date,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

EventSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Event", EventSchema);