const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default:"Member" },
    userId : {type: String,required:true},
    created: { type: Date, default: Date.now }
},{collection:'userAuth'});

module.exports = mongoose.model('userAuth', schema);