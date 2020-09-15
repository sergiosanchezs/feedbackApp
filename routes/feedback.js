const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList();
      return res.json(feedback);
    } catch (err) {
      return next(err);
    }
    // res.send('Feedback page');
  });

  router.post('/', (req, res, err) => {
    try {
      return res.send('feedback from posted');
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
