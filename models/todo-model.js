/**
 * Todo Model - Mongoose Schema
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    title: {
        type: String,
        default: '',
        required: true
    },
    description: {
        type: String,
        default: '',
        required: true
    },
    target: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Todo', TodoSchema);
