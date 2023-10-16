const express = require('express')
const connectToDb = require('./database/connect')
const taskRoutes = require('./v1/routes/taskRoutes')
const taskErrorHandler = require('./middleware/ErrorHandler')
require("dotenv").config()


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use('/api/v1/tasks', taskRoutes)
app.get('/', (req, res)=>{
    res.send("hello world")
})

const startServer = async()=>{
    try {
        await connectToDb(process.env.MONGO_URI)
        console.log("successfully connected to to db")
        app.listen(PORT, (req, res)=>{
            console.log("server is listenning on port ", PORT)
        })
    } catch (error) {
        console.log(error)
    }
}
app.use(taskErrorHandler)
startServer()