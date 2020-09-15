const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const speakers = await speakersService.getList();
      const artworks = await speakersService.getAllArtwork();
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artworks,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (req, res, next) => {
    try {
      const shortName = req.params.shortname;
      const speaker = await speakersService.getSpeaker(shortName);
      const artworks = await speakersService.getArtworkForSpeaker(shortName);
      // console.log(artwork);
      // res.send(`Detail Page of ${req.params.shortname}`);s
      return res.render('layout', {
        pageTitle: 'Speaker Detail',
        template: 'speakers-detail',
        speaker,
        artworks,
      });
    } catch (err) {
      return next(err);
    }
  });
  return router;
};
