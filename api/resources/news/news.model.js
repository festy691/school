const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let NewsSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    subtitle : {
        type : String,
        required : false
    },
    image : {
        type : [String]
    },
    details : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

NewsSchema.plugin(mongosePaginate);
module.exports = mongoose.model("News", NewsSchema);