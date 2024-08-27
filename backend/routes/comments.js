const express = require('express')
const router = express.Router()
const {
    createComment,
    editComment,
    deleteComment
} = require('../controllers/commentController')

// Create a new comment for a specific workout
router.post(`/projects/:projectId/comments`, createComment)

// Edit existing comment:
router.patch(`/projects/:projectId/comments`, editComment)

// Delete existing comment:
router.delete(`/projects/:projectId/comments`, deleteComment)

module.exports = router;