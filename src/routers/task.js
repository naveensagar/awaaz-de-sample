const express = require('express')
const Task = require('../db/models/task')
const Project = require('../db/models/project')
const router = express.Router();

// SHOW THE TASK WITH GIVEN ID
router.get('/projects/:id/tasks/:task_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.task_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// show the edit form for a task
router.get('/projects/:id/tasks/:task_id/edit', async (req, res) => {
    try {
        const task = await Task.findById(req.params.task_id)
        if (!task) {
            return res.status(404).send()
        }
        res.render('tasks/edit', { task })
    } catch (e) {
        res.status(500).send()
    }
})

// show a form for adding new task
router.get('/projects/:id/tasks', (req, res) => {
    res.render('tasks/new', { project_id: req.params.id })
})

// add a new task 
router.post('/projects/:id/tasks', async (req, res) => {
    req.body.task["project"] = req.params.id
    const task = new Task(req.body.task)
    try {
        await task.save()
        const project = await Project.findById(req.params.id)
        project.tasks.push(task)
        await project.save()
        res.redirect('/projects/' + req.params.id)
    } catch (e) {
        res.status(400).send(e)
    }
})

// update a task
router.patch('/projects/:id/tasks/:task_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.task_id, req.body.task, { new: true, runValidators: true})

        if (!task) {
            return res.status(404).send()
        }

        res.redirect('/projects/' + req.params.id)
    } catch (e) {
        res.status(500).send(e)
    }
})

// delete a task
router.delete('/projects/:id/tasks/:task_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.task_id)
        
        if (!task) {
            return res.status(404).send()
        }
        res.redirect('/projects/' + req.params.id)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router