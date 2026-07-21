const express = require('express');
const { asyncHandler } = require('../utility/middlewares')
const router = express.Router();
const {PubFindAll, PubFindUnique, PubLikePublication} = require('../controllers/recommend')

router.get("/", asyncHandler(PubFindAll))
router.get("/:filename", asyncHandler(PubFindUnique))
router.patch("/:filename", asyncHandler(PubLikePublication))

module.exports = router
