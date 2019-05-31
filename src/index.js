const express = require('express')
require('./db/mongoose')
const Project = require('./db/models/project')
const Task = require('./db/models/task')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

// ====== ROUTES ==========

app.get('/', (req, res) => {
    res.redirect('/projects')
})

// SHOW ALL THE PROJECTS
app.get('/projects', async (req, res) => {

    try {
        const projects = await Project.find({})
        if (!projects) {
            return res.status(404).send()
        }
        res.send(projects)
    } catch (e) {
        res.status(500).send()
    }
})

// SHOW THE PROJECT WITH GIVEN ID
app.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('tasks')
        if (!project) {
            return res.status(404).send()
        }
        res.send(project)
    } catch (e) {
        res.status(500).send()
    }
})

// SHOW THE TASK WITH GIVEN ID
app.get('/projects/:id/tasks/:task_id', async (req, res) => {
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

// CREATE ROUTE
app.post('/projects', async (req, res) => {
    const project = new Project(req.body)
    try {
        await project.save()
        res.status(201).send(project)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/projects/:id/tasks', async (req, res) => {
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



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})