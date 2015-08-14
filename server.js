// modules
var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    methodOverride    = require('method-override'),
    morgan            = require('morgan'),
    errorHandler      = require('errorhandler'),
    FileStreamRotator = require('file-stream-rotator'),
    fs                = require('fs'),
    mongoose          = require('mongoose');
    
//config
var db              = require('./config/db')[process.env.NODE_ENV],
    server          = require('./config/server')[process.env.NODE_ENV],
    logDir          = __dirname + '/logs';
    
fs.existsSync(logDir) || fs.mkdirSync(logDir);

var accessLogStream = FileStreamRotator.getStream({
        filename  : logDir + '/access-%DATE%.log',
        frequency : 'daily',
        verbose   : false,
        date_format: 'YYYY-MM-DD'
      });
     
mongoose.connect(db.url);

/** Hack to load Models before routing **/
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

switch(process.env.NODE_ENV) {
    case 'development' :
        app.use(morgan('dev'));
        break;
    case 'production' :
        app.use(morgan('combined', {stream: accessLogStream}));
        break;
}

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler(server.errorHandlerOptions));

require('./app/routes')(app);

this.app = app;
this.server = server;

exports.listen = function () {
    if( process.env.NODE_ENV !== 'test' ) {
        console.log('Server running in ' + process.env.NODE_ENV + ' mode on port ' + this.server.port );
    }
    return this.app.listen.apply(this.app, [this.server.port]);
};

exports.close = function (callback) {
    this.app.close.apply(callback);
};