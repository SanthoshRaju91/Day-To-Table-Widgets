/**
 * Notes model Schema
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotesSchema = new Schema({
    notes: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Notes', NotesSchema);
