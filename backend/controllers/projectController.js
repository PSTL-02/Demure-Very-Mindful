const Project = require('../models/projectModel');
const mongoose = require('mongoose')


// Get all projects
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({}).populate({
            path: 'comments',
            model: 'Comment'
        }).sort({createdAt: -1})
        res.status(200).json(projects)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
}

// Get single project
const getProject = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such project'});
    }

    try {
        const project = await Project.findById(id).populate({
            path: 'comments',
            model: 'Comment'
        })

        if(!project) {
        return res.status(404).json({error: 'No such project'});
        }

        res.status(200).json(project)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal Server Error"})
    } 
}

// Create Project
const createProject = async (req, res) => {
    const {title, type, author, description, socials, link, user_id} = req.body
    const imageFileName = req.file ? req.file.filename : null

    try {
        const project = await Project.create({title,
            type, 
            author, 
            description, 
            image :imageFileName,
            socials, 
            link, 
            user_id})
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
 

// Delete Project
const deleteProject = async (req, res) => {

    const {id} = req.params;
  
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such project'});
    }

    const project = await Project.findOneAndDelete({_id: id})

    if (!project) {
        return res.status(404).json({error: 'No such project'});
    }

    res.status(200).json(project);
}

// Update Project
const updateProject = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such project'});
    }

    const project = await Project.findOneAndUpdate(
        {_id: id}, 
        {...req.body},
        {new: true}
    );

    if(!project) {
        return res.status(404).json({error: 'No such project'});
    }

    res.status(200).json(project)
}

module.exports = {getProjects, getProject, createProject, deleteProject, updateProject}