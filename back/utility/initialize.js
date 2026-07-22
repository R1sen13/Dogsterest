const prisma = require('../database/database')

async function initializeDB() {
    const response = await fetch('https://random.dog/doggos')
    const data = await response.json()
    for (let url in data) {
        const randomLikes = Math.floor(Math.random() * 101)
        await prisma.publication.create({
            data: {
                filename: data[url],
                likes: randomLikes
            }
        })
    }
}

async function dropDB() {
    const deleted = await prisma.publication.deleteMany({})
    console.log(`Deleted ${deleted.count}`)
}

module.exports = { initializeDB, dropDB }