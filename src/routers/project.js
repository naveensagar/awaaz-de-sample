const express = require('express')
const Project = require('../db/models/project')
const router = express.Router()


router.get('/', (req, res) => {
    res.redirect('/projects')
})

// show all the projects
router.get('/projects', async (req, res) => {

    try {
        const projects = await Project.find({})
        if (!projects) {
            return res.status(404).send()
        }
        res.render('landing', { projects })
    } catch (e) {
        res.status(500).send()
    }
})

// show form to create a new route
router.get('/projects/new', (req, res) => {
    res.render('projects/new')
})

// create a route
router.post('/projects', async (req, res) => {
    const project = new Project(req.body.project)
    try {
        await project.save()
        res.status(201).redirect('/projects')
    } catch (e) {
        res.status(400).send(e)
    }
})

// show a specific project with a given id
router.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('tasks')
        if (!project) {
            return res.status(404).send()
        }
        res.render('projects/index', { project })
    } catch (e) {
        res.status(500).send()
    }
})

// get the edit form for a project
router.get('/projects/:id/edit', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).send()            
        }
        res.render('projects/edit', { project })    
    } catch (e) {
        res.status(500).send(e)
    }  
})

// update a form
router.patch('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body.project, { new: true, runValidators: true })

        if (!project) {
            return res.status(404).send()
        }

        res.redirect('/projects')
    } catch (e) {
        res.status(500).send()
    }
}) 

// delete a form
router.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)

        if (!project) {
            return res.status(404).send()
        }
        res.redirect('/projects')
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router