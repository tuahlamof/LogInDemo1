var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var home = require('./routes/home');
var watson = require('watson-developer-cloud');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser());
app.use(express.cookieParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.signin);

app.get('/signin', home.signin);
app.post('/afterSignIn', home.afterSignIn);
app.get('/getAllUsers', home.getAllUsers);
app.get('/signup', home.signup);
app.post('/afterSignUp', home.afterSignUp);
app.post('/', function (req, res) {
	var language_translation = watson.language_translation({
  	username: 'bcd9bebb-d032-4e8d-bec1-1f62c166128e',
  	password: 'QdxXpPhUZylY',
 	  version: 'v2'
	});


	language_translation.translate({
    	text: 'Team 8 members: Huiyu Yang, Jing Lu, Sheng Zhou, Xiaoyu Liang',
    	source: 'en',
   	 target: 'es'
  	}, function(err, translation) {
    	if (err)
      	console.log(err)
   	 	else
     	 console.log(translation);
	});
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
