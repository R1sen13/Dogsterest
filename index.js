const { initializeDB, dropDB } = require('./utility/initialize')
const express = require('express')
const cors = require('cors')
const { errorHandler, loggerMiddleware } = require('./utility/middlewares')

const app = express()
const PORT = 3000

const recommendRoute = require('./routes/recommend')
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(loggerMiddleware)
app.use('/publications', recommendRoute)
app.use(errorHandler)

initializeDB()

app.listen(PORT, () => {
    console.log("Server is running")
})

process.on('SIGINT', async () => {
    await dropDB()
    process.exit()
})