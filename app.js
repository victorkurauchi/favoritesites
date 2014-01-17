
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  favorite = require('./routes/favorite'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};

app.configure(function() {

    // set up our express application
    app.use(express.logger('dev')); // log every request to the console
    //app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms

    //app.set('view engine', 'ejs'); // set up ejs for templating

    // required for passport
    //app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
    //app.use(passport.initialize());
    //app.use(passport.session()); // persistent login sessions
    //app.use(flash()); // use connect-flash for flash messages stored in session

});


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/expose/:dir/:name', routes.expose);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// favorites
app.post('/api/favorite', favorite.create);
app.get('/api/favorite', favorite.list);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
