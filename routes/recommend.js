const express = require('express');
const router = express.Router();
const {PubFindAll, PubFindUnique, PubLikePublication} = require('../controllers/recommend')

router.get("/", PubFindAll)
router.get("/:filenmae", PubFindUnique)
router.patch("/:filename", PubLikePublication)

module.exports = router
