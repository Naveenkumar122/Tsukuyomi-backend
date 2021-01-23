const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    empEmail: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: String, default: null },
    isPending: { type: Boolean, default: true },
    approved: { type: Boolean, default: false }
},{collection:"AdLoan"});



module.exports = mongoose.model('AdLoan', schema);