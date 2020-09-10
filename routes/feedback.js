const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (req, res) => {
    const feedback = await feedbackService.getList();
    res.json(feedback);
    // res.send('Feedback page');
  });

  router.post('/', (req, res) => {
    res.send('feedback from posted');
  });

  return router;
};
