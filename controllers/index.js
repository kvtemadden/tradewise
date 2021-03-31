const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const jobRoutes = require('./jobRoutes');
const userRoutes = require('./userRoutes');


router.use('/', homeRoutes);
router.use('/jobs', jobRoutes);
router.use('/user', userRoutes);

module.exports = router;
