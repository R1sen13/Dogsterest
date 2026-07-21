const prisma = require('../database/database')

async function PubFindAll(req, res) {
    const publications = await prisma.publication.findMany({
        skip: parseInt(req.query.offset) || 0,
        take: parseInt(req.query.limit) || 10
    })

    if (!publications) {
        const err = new Error('Публикации не найдены');
        err.status = 404;
        throw err;
    }

    res.json(publications)
}

async function PubFindUnique(req, res) {
    const filename = req.params.filename;

        if (!filename) {
            const err = new Error('Нет такого названия файла');
            err.status = 400;
            throw err;
        }

    const publication = await prisma.publication.findUnique({
        where: {
            filename: filename
        }
    })

    if (!publication) {
        const err = new Error('Публикация не найдена');
        err.status = 404;
        throw err;
    }

    res.status(200).json(publication)
}

async function PubLikePublication(req, res) {
    const filename = req.params.filename;

        if (!filename) {
            const err = new Error('Нет такого названия файла');
            err.status = 400;
            throw err;
        }

    await prisma.publication.update({
        where: {
            filename: filename
        },
        data: {
            likes: {
                increment: 1
            }
        }
    })

    res.status(200).json({"Успех": true})
}

module.exports = {PubFindAll, PubFindUnique, PubLikePublication}