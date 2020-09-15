const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (req, res, next) => {
    // if (!req.session.visitcount) req.session.visitcount = 0;
    // req.session.visitcount++;
    // console.log(`Number of visits: ${req.session.visitcount}`);
    try {
      const topSpeakers = await speakersService.getList();
      const artworks = await speakersService.getAllArtwork();
      // console.log(topSpeakers);
      return res.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artworks,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
