var mongoose        = require('mongoose'),
    User            = mongoose.model('User'),
    jwt             = require('jsonwebtoken'),
    security        = require('../../config/security'),
    Handler         = require('../helpers/handler'),
    EventEmitter    = require('../events/listeners');

module.exports = {
    login :  function(request, response) {
        var user = request.user;
        if( !user ) {
            return response.status(401).json({message: 'Authentication failed'});
        }
        
        return response.json(
            {
                username: user.username, 
                token: jwt.sign(
            {
                user_id: user.id
            }, security.jwt.secretOrKey)
        
        });
    },
    
    logout : function(request, response) {
        return response.status(200).end();
    },
    
    subscribe : function(request, response) {
        var registered = new User({username: request.body.username, password: request.body.password});
        registered.validate(function(errors) {
            if( errors ) {
                return Handler.errorHandler(errors, 400, response);
            }
            
            User.findOne({username: request.body.username}, function(error, user) {
                if( error ) {
                    return response.send(error);
                }
                if( !user ) {
                    registered.save(function(errors) {
                        if( errors ) {
                            return Handler.errorHandler(errors, 500, response);
                        }
                        
                        return response.status(201).json({
                                    username: registered.username, 
                                    token: jwt.sign(
                                        {
                                            user_id: registered.id
                                        }, security.jwt.secretOrKey)
                                    });
                    });
                } else {
                    return response.status(409).json({message: 'Account already exists'});
                }
            });
        });
    },
    
    unsubscribe : function(request, response) {
        var user = request.user;
         
        if( !user ) {
            return response.status(401).json({message: 'Authentication failed'});
        }
        
        User.remove({username: user.username}, function(error) {
            if( error ) {
                return response.status(500).send(error);
            }
            
            EventEmitter.eventEmitter.emit(EventEmitter.events.ACCOUNTS_DELETE_BY_USER_ID_EVT, user.id);
            
            return response.status(204).end();
        });
    }
}