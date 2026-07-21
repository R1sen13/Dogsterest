const express = require('express');
const { asyncHandler } = require('../utility/middlewares')
const router = express.Router();
const {PubFindLikedAll, PubFindUnique, PubDislikePublication} = require('../controllers/liked')

router.get("/", asyncHandler(PubFindLikedAll))
router.get("/:filename", asyncHandler(PubFindUnique))
router.patch("/:filename", asyncHandler(PubDislikePublication))

module.exports = router
