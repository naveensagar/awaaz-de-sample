const mongoose = require('mongoose')
// Projects have a name, description, duration, and avatar (image) and can be viewed/edited
//  from their own uniquely addressed details page.

const Project = mongoose.model('Project', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        default: "http://www.illuminationworksllc.com/wp-content/uploads/2017/04/ProjectManagement-1.jpg"
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        trim: true,
        required: true
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
})

module.exports = Project