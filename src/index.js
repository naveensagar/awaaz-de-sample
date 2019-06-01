const express = require('express')
bodyParser     = require("body-parser"),
methodOverride = require('method-override')
const path = require('path')
const app = express()

require('./db/mongoose')

const projectRouter = require('./routers/project')
const taskRouter = require('./routers/task')

const port = process.env.PORT || 3000
app.set('views', path.join(__dirname, '../views'));

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json())
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"))
app.use(projectRouter)
app.use(taskRouter)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})