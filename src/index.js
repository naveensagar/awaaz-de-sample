const express = require('express')
require('./db/mongoose')
const Project = require('./db/models/project')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

// ====== ROUTES ==========

app.get('/', (req, res) => {
    res.send('will redirect to projects page')
})

// SHOW ROUTE
app.get('/projects', (req, res) => {
    res.send('will render projects page')
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


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})