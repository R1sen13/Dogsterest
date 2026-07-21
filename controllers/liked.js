const prisma = require('../database/database')

async function PubFindLikedAll(req, res) {
    const publications = await prisma.publication.findMany({
        where: {
            filename: req.params.filename
        },
        skip: req.body.offset,
        take: req.body.limit
    })

    if (!publications) {
        res.json({"No publications": true})
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

async function PubDislikePublication(req, res) {
    await prisma.publication.update({
        where: {
            filename: req.params.filename,
            liked: true
        },
        data: {
            likes: publication.likes-=1,
            liked: false
        }
    })

    res.json({"success": true})
}

module.exports = {PubFindLikedAll, PubFindUnique, PubDislikePublication}