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
        default: "Web Design"
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    socials: {
        type: String
    },
    image: {
        type: String,
        default: null
    },
    link: {
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
 