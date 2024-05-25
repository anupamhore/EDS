const mongoose = require('mongoose');

const emailRequestSchema = new mongoose.Schema({
    to: {type: String, required: true},
    subject: { type: String, required: true},
    body: { type: String, required: true},
    status: {type: String, default: 'Pending'},
}, {
    timestamps: true
});

module.exports = mongoose.model('EmailRequest', emailRequestSchema);