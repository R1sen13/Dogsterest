const prisma = require('../database/database')

async function PubFindAll(req, res) {
    const publications = await prisma.publication.findMany({
        skip: req.body.offset,
        take: req.body.limit
    })

    if (!publications) {
        throw new Error("No publications found")
    }

    res.json(publications)
}

async function PubFindUnique(req, res) {
    const publication = await prisma.publication.findUnique({
        where: {
            filename: req.params.filename
        }
    })

    if (!publication) {
        throw new Error("No publications found")
    }

    res.json(publication)
}

async function PubLikePublication(req, res) {
    await prisma.publication.update({
        where: {
            filename: req.params.filename
        },
        data: {
            likes: publication.likes+=1,
            liked: true
        }
    })

    res.json({"success": true})
}

module.exports = {PubFindAll, PubFindUnique, PubLikePublication}