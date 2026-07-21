const { initializeDB, dropDB } = require('./utility/initialize')
const express = require('express')
const { errorHandler, loggerMiddleware } = require('./utility/middlewares')

const app = express()
const PORT = 3000

const recommendRoute = require('./routes/recommend')
const likedRoute = require('./routes/liked')
app.use(express.json())
app.use(loggerMiddleware)
app.use('/liked', likedRoute)
app.use('/', recommendRoute)
app.use(errorHandler)

initializeDB()

app.listen(PORT, () => {
    console.log("Server is running")
})

process.on('SIGINT', async () => {
    await dropDB()
    process.exit()
})