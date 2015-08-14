var passport        = require('../security/passport'),
    UserController  = require('../controllers/users');
    
module.exports = function(app) {
    
    app.post('/api/users/login', passport.local, UserController.login);
    
    app.delete('/api/users/login', UserController.logout);
    
    app.post('/api/users', UserController.subscribe);
    
    app.delete('/api/users', passport.jwt, UserController.unsubscribe);
};