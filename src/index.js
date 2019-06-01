const express = require('express')
bodyParser     = require("body-parser"),
methodOverride = require('method-override')

require('./db/mongoose')
const Project = require('./db/models/project')
const Task = require('./db/models/task')

const path = require('path')
const app = express()

const port = process.env.PORT || 3000
app.set('views', path.join(__dirname, '/views'));


app.use(express.json())
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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
        res.render('projects/index', { projects })
    } catch (e) {
        res.status(500).send()
    }
})

// ROUTE FOR CREATING A NEW PROJECT
app.get('/projects/new', (req, res) => {
    res.render('projects/new')
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
    const project = new Project(req.body.project)
    try {
        await project.save()
        res.status(201).redirect('/projects')
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

app.delete('/projects/:id', async (req, res) => {
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

app.get('/projects/:id/edit', async (req, res) => {
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

app.patch('/projects/:id', async (req, res) => {
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

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})