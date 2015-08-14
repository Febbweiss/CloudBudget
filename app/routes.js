var fs  = require('fs');

module.exports = function(app) {
    
    var routes_path = __dirname + '/routes'
    fs.readdirSync(routes_path).forEach(function (file) {
      if (~file.indexOf('.js')) {
          var route = require(routes_path + '/' + file);
          route(app);
      }
    })
    
     app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
};