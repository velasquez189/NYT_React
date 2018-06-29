const router = require("express").Router();
const articleRoutes = require("./articles");

// Article routes
console.log('api index folder');
router.use('/nyt', articleRoutes);

module.exports = router;
