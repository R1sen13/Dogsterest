const { initializeDB, dropDB } = require('./utility/initialize')
const express = require('express')

const app = express()
const PORT = 3000
const recommendRoute = require('./routes/recommend')
const likedRoute = require('./routes/liked')

initializeDB()
app.use(express.json())
app.use('/', recommendRoute)
app.use('/liked', likedRoute)

app.listen(PORT, () => {
    console.log("Server is running")
})

process.on('SIGINT', () => {
    dropDB()
    process.exit()
})