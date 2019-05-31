const mongoose = require('mongoose')
// Projects have a name, description, duration, and avatar (image) and can be viewed/edited
//  from their own uniquely addressed details page.

const Project = mongoose.model('Project', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    }

    // Add lists of tasks associted with project
})

module.exports = Project