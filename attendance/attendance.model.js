const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    empID:{type:String,required:true},
    teamName:{type:String,required:true},
    Attdate: { type: Date, required:true},
    Entry: { type: Date, required:true},
    Exit: { type: Date, default:null }
},{collection:"attendance"});



module.exports = mongoose.model('attendance', schema);