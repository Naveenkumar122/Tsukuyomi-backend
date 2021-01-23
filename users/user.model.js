const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String,  required: true },
    email: { type: String,unique:true, required: true },
    salary:{type:String,required:true},
    role: { type: String, default:"Member" },
    teamName: { type: String,  required: true },
    created: { type: Date, default: Date.now }
},{collection:'users'});


module.exports = mongoose.model('user', schema);