const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (req, res) => {
    // if (!req.session.visitcount) req.session.visitcount = 0;
    // req.session.visitcount++;
    // console.log(`Number of visits: ${req.session.visitcount}`);
    const topSpeakers = await speakersService.getList();
    const allArtworks = await speakersService.getAllArtwork();
    // console.log(topSpeakers);
    res.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers, allArtworks });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
