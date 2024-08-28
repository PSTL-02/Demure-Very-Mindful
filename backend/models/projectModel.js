// project model
const mongoose = require('mongoose');

const Schema = mongoose.Schema 

const projectSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    sDescription: {
        type: String,
        required: true
    },
    bDescription: {
        type: String
    },
    socials: {
        type: String
    },
    image: {
        type: String,
        default: null
    },
    links: {
        type: String,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Project', projectSchema);