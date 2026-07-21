const prisma = require('../database/database')

async function initializeDB() {
    const response = await fetch('https://random.dog/doggos')
    const data = await response.json()
    for (let url in data) {
        await prisma.publication.create({
            data: {
                filename: data[url]
            }
        })
    }
}

async function dropDB() {
    const deleted = await prisma.product.deleteMany({})
    console.log(`Deleted ${deleted.count}`)
}

module.exports = { initializeDB, dropDB }