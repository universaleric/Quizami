const router = require('express').Router();
const { Score } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newScore = await Score.create({
      ...req.body,
    });

    res.status(200).json(newScore);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
