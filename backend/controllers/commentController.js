// comment controller
const Comment = require('../models/commentModel');
const Project = require('../models/projectModel');

// Creation of the Comment
const createComment = async (req,res) => {
    const {projectId} = req.params // this is the id of the project to create the comment on

    try {
        const project = await Project.findById(projectId)

        if(!project) {
            return res.status(404).json({error: 'Project Not Found'});
        }

        const newComment = new Comment ({
            text: req.body.text,
            user_id: req.body.user_id
        })

        // saving the comment to the db
        await newComment.save();

        // pushing the comment into the comments array on projects
        project.comments.push(newComment);

        // save the project on the db
        await project.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error'});
    }
}

// Edit The Comment
const editComment = async (req,res) => {
    const {projectId, commentId} = req.params
    try {
        const project = await Project.findById(projectId);

        if(!project) {
            return res.status(404).json({error: 'Project Not Found'});
        }

        const comment = await Comment.findByIdAndUpdate(
            commentId,
            {
                text: req.body.text,
            },
            {new: true}
        
        )

        if(!comment) {
            return res.status(404).json({error: 'Comment Not Found'});
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error'});
    }
}

// Delete The Comment
const deleteComment = async (req,res) => {
    const {projectId, commentId} = req.params

    try {

    if(!project) {
        return res.status(404).json({error: 'Project Not Found'});
    }

    const comment = await Comment.findByIdAndDelete(commentId)

    if(!comment) {
        return res.status(404).json({error: 'Comment Not Found'});
    }

    // remove the comment reference
    project.comments = project.comments.filter(
        (comment) => comment.toString() !== commentId
    )

    res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error'});
    }
}

// Exports
module.exports = {createComment, editComment, deleteComment}