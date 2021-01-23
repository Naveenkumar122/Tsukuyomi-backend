const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    empID:{type:String,required:true},
    teamName:{type:String,required:true},
    updated:{type:Boolean,default:false},
    Accepted:{type:Boolean,default:false},
    Attdate: { type: String, required:true},
    Entry: { type: String, required:true},
    Exit: { type: String, default:null },
    empEmail: {type: String,required:true},
    Entryupdated:{type:Boolean,default:null},
    Exitupdated:{type:Boolean,default:null}
},{collection:"attendance"});



module.exports = mongoose.model('attendance', schema);