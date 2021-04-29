const router = require('express').Router();
const questionRoutes = require('./questionRoutes');
const quizRoutes = require('./quizRoutes');
const scoreRoutes = require('./scoreRoutes');
const userRoutes = require('./userRoutes');

router.use('/question', questionRoutes);
router.use('/quiz', quizRoutes);
// router.use('/score', scoreRoutes);
router.use('/users', userRoutes);

module.exports = router;
