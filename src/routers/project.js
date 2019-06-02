const express = require('express')
const Project = require('../db/models/project')
const router = express.Router()


router.get('/', (req, res) => {
    res.redirect('/projects')
})

// SHOW ALL THE PROJECTS
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

// ROUTE FOR CREATING A NEW PROJECT
router.get('/projects/new', (req, res) => {
    res.render('projects/new')
})

// CREATE ROUTE
router.post('/projects', async (req, res) => {
    const project = new Project(req.body.project)
    try {
        await project.save()
        res.status(201).redirect('/projects')
    } catch (e) {
        res.status(400).send(e)
    }
})

// SHOW THE PROJECT WITH GIVEN ID
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