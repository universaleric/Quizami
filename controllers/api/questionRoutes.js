const router = require('express').Router();
const { Question } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newQuestion = await Question.create({
      ...req.body,
    });

    res.status(200).json(newQuestion);
  } catch (err) {
    res.status(400).json(err);
  }
});
