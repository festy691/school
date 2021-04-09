const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let SessionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

SessionSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Session", SessionSchema);