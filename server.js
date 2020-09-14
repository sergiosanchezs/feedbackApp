/* eslint no-console: "error" */

const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');

const app = express();

const port = process.env.PORT || 3000;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['ASDASDASDaiudshas194', 'aisduh2398uhdiesdasASD'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX Meetups';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (req, res, next) => {
  try {
    const names = await speakersService.getNames();
    res.locals.speakersNames = names;
    // console.log(res.locals);
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

// app.get('/', (req, res) => {
//   // res.send('Hello Express :)');
//   // res.sendFile(path.join(__dirname, './static/index.html'));
//   res.render('pages/index', { pageTitle: 'Welcome' });
// });

// app.get('/speakers', (req, res) => {
//   res.sendFile(path.join(__dirname, './static/speakers.html'));
// });

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
