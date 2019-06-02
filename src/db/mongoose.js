const mongoose = require('mongoose')
// Connect to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/awaaz-de-sample-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

