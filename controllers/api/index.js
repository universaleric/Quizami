const router = require('express').Router();
const questionRoutes = require('./questionRoutes');
const quizRoutes = require('./quizRoutes');
const scoreRoutes = require('./scoreRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/question', questionRoutes);
router.use('/quiz', quizRoutes);
router.use('/score', scoreRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
