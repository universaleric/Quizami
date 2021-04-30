const router = require('express').Router();
const { User, Quiz, Question, Score } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all quizzes and JOIN with user data
    const quizData = await Quiz.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['username'],
      //   },
      // ],
    });

    // Serialize data so the template can read it
    const quizzes = quizData.map((quiz) => quiz.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      quizzes,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/quiz/:id', async (req, res) => {
  try {
    const quizData = await Quiz.findByPk(req.params.id, {
      //   include: [
      //     {
      //       model: User,
      //     },
      //   ],
    });

    const quiz = quizData.get({ plain: true });
    console.log(quiz);

    res.render('quizPage', {
      ...quiz,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/quizmaker/:id', async (req, res) => {
  try {
    const quizData = await Quiz.findByPk(req.params.id, {
      // include: [
      //   {
      //     model: User,
      //   },
      // ],
    });

    const quiz = quizData.get({ plain: true });
    console.log(quiz);

    res.render('quizmaker', {
      ...quiz,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/quiztaker/:id', async (req, res) => {
  try {
    const questionData = await Question.findAll({
      
      where: {
        quiz_id: req.params.id
      }
    });

    console.log(questionData);
    // const questions = quizData.get({ plain: true });
    const questions = questionData.map((question) => question.get({ plain: true }));

    console.log(questions);
    
    res.render('quiztaker', {
      ...questions,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/highScores', async (req, res) => {
  try {
    // Get all scores and JOIN with user and quiz data
    const scoreData = await Score.findAll({
      // include: [
      //   {
      //     model: Quiz,
      //   },
      //   {
      //     model: User,
      //   },
      // ],
    });

    // Serialize data so the template can read it
    const scores = scoreData.map((score) => score.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('highScores', {
      scores,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Quiz }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
