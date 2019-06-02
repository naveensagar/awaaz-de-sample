const mongoose = require('mongoose')

/**
 * Tasks have a name, description, start and end dates and can be viewed/edited 
 * from their own uniquely addressed details page.
 *  Ideally, tasks URLs are nested within project URLs (i.e. “.../project/5/task/3”)
 */

const Task = mongoose.model('Task', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    }
    // Add lists of sub task associated with this task
})

module.exports = Task