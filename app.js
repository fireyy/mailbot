var express = require('express')
  ,request = require('request')
  , passport = require('passport')
  , partials = require('express-partials')
  , util = require('util')
  , ReadabilityStrategy = require('passport-readability').Strategy
  , Firebase = require('firebase')
  , _config = require('./libs/config.js')
  ;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new ReadabilityStrategy({
    consumerKey: _config("readability").consumer_key,
    consumerSecret: _config("readability").consumer_secret,
    callbackURL: "http://127.0.0.1:3000/auth/readability/callback"
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      var readabilityData = new Firebase(_config("firebase").cave+"readability")
    ;
      readabilityData.set({
        token: token,
        token_secret: tokenSecret
      },function(){
        return done(null, profile);
      });
    });
  }
));

var app = express();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('node-sass').middleware({
      src: __dirname + '/public'
    , dest: __dirname + '/public'
    , debug: false
    , outputStyle: 'compressed'
  }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', require('./routes/index'));

app.get('/bookmarks/:page', require('./routes/bookmarks'));
app.get('/add-queue', require('./routes/add-queue'));
app.get('/users', require('./routes/users'));
app.get('/send', require('./routes/send'));

app.get('/login', require('./routes/login'));

app.get('/auth/readability',
  passport.authenticate('readability'),
  function(req, res){
    // 会被引导到 readability 网站验证，这里的函数不会被执行
});

app.get('/auth/readability/callback',
  passport.authenticate('readability', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000);

//检查是否通过验证
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}