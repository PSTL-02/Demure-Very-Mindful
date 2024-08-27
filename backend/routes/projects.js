// all the endpoints for our workouts
// bring in express:
const express = require('express');
const router = express.Router();

// Multer JS Initialization
const multer = require('multer'); 
const path = require('path');

// Configure Multer's Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext); // This Is The Unique File Name
    }
});

const upload = multer({storage}); // public folder

// import the controller functions
const {
    getProjects,
    getProject,
    createProject,
    deleteProject,
    updateProject
} = require('../controllers/projectController')

// router variable + http method to create a route
router.get('/', getProjects)
router.get('/:id', getProject);
router.post('/', upload.single('image'), createProject)
router.delete('/:id', deleteProject)
router.patch('/:id', updateProject);

module.exports = router;