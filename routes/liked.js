const express = require('express');
const router = express.Router();
const {PubFindLikedAll, PubFindUnique, PubDislikePublication} = require('../controllers/liked')

router.get("/", PubFindLikedAll)
router.get("/:filename", PubFindUnique)
router.patch("/:filename", PubDislikePublication)

module.exports = router
