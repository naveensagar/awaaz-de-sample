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

router.post('/projects/:id/tasks', async (req, res) => {
    req.body["project"] = req.params.id
    const task = new Task(req.body)

    try {
        await task.save()
        const project = await Project.findById(req.params.id)
        project.tasks.push(task)
        await project.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router