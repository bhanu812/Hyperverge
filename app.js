const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
const appRoutes = require('./routes');

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/', appRoutes);


app.get('/', function (req, res) {
  res.render('index');
});


app.get('/', (req, res) => {
  res.send('hello');
});

module.exports = app;