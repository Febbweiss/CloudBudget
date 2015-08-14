var mongoose        = require('mongoose'),
    User            = mongoose.model('User'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    JwtStrategy     = require('passport-jwt').Strategy,
    security        = require('../../config/security');
    
passport.use( new LocalStrategy( 
    function(username, password, done) {
        User.getAuthenticated(username, password, function(error, user, errorStatus) {
            if( error ) {
                return done(error, null);
            }
            
            if( !user ) {
                return done(null, false);
            }
            
            return done(null, user);
        });
    }
));

passport.use( new JwtStrategy(security.jwt, function(jwt_payload, done) {
    User.findById(jwt_payload.user_id, function(error, user) {
        if( error ) {
            return done(error, null);
        }
        if( user ) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports = {
    jwt: passport.authenticate('jwt', {session: false}),
    local: passport.authenticate('local', {session: false})
}