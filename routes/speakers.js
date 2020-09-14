const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (req, res) => {
    const speakers = await speakersService.getList();
    const allArtworks = await speakersService.getAllArtwork();
    res.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, allArtworks });
  });

  router.get('/:shortname', async (req, res) => {
    const shortName = req.params.shortname;
    const speaker = await speakersService.getSpeaker(shortName);
    const artworks = await speakersService.getArtworkForSpeaker(shortName);
    // res.send(`Detail Page of ${req.params.shortname}`);
    console.log(artworks);

    res.render('layout', {
      pageTitle: 'Speaker Detail',
      template: 'speakers-detail',
      speaker,
      artworks,
    });
  });

  return router;
};
