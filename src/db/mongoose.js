const mongoose = require('mongoose')
// Connect to mongoose
const databaseURL = process.env.DATABASEURL || 'mongodb://127.0.0.1:27017/awaaz-de-sample-app'
mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

