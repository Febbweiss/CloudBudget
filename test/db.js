var mongoose    = require('mongoose'),
    jwt         = require('jsonwebtoken'),
    security    = require('../config/security');
    

var USER_ID = '55c9e2e3d300cc798928cc87',
    HACKER_ID = '55c9e2e4d300cc798928cc88',
    ACCOUNT_ID = '55c9e2fcd300cc798928cc8b';
    
var DATA = {
        User: [
            {
                _id: USER_ID, 
                username: 'test', 
                password: 's3cr3t'
            },
            {
                _id: HACKER_ID, 
                username: 'hacker', 
                password: 'bl4ckh4t'
            }
        ],
        Account: [
            {
                _id: ACCOUNT_ID,
                name: 'Default', 
                reference: '1234567890', 
                user_id: USER_ID, 
                categories: [{key: 'test', label: 'Test', sub_categories: []}]
            }
        ],
        Entry: [
            {
                account_id: ACCOUNT_ID,
                label: 'Test bill',
                type: 'BILL',
                amount: -100,
                date: '2015-08-13', 
            }
        ]
    },
    
    process_collection = function(collection, data, done) {
        mongoose.connection.base.models[collection].find({}).remove(function(err) {
			if (err) {
			    console.log('Can\'t delete collection ' + collection, err );
			}
            var res = [];
            for( var item  in data ) {
                mongoose.connection.base.models[collection].create(data[item], function(err, newItem) {
                    res.push(err);
                    if( err ) {
                        console.log('Can\'t insert document', err);
                    }
                    if (res.length === data.length) {
                        return done();
                    }
                    
                    newItem.save(function(error) {
                        res.push(err);
                        if (res.length === data.length) {
                            return done();
                        }
                    });
                });
            }
        });
    },
    
    drop_collection = function(collection, data, done) {
        mongoose.connection.base.models[collection].find({}).remove(function(err) {
			if (err) {
			    console.log('Can\'t delete collection ' + collection, err );
			}
            return done();
        });
    };

module.exports = {
    USER_ID: USER_ID,
    HACKER_ID: HACKER_ID,
    ACCOUNT_ID: ACCOUNT_ID,
    
    init : function(done) {
        var collections_to_process = Object.keys(DATA).length,
            collectionsDone = 0;
        
        for( var collection in DATA ) {
           process_collection(collection, DATA[collection], function() {
               collectionsDone++;
               if( collectionsDone === collections_to_process ) {
                   done();
               }
           }) 
        }
    },
    
    drop : function(done) {
        var collections_to_process = Object.keys(DATA).length,
            collectionsDone = 0;
        
        for( var collection in DATA ) {
           drop_collection(collection, DATA[collection], function() {
               collectionsDone++;
               if( collectionsDone === collections_to_process ) {
                   done();
               }
           }) 
        }
    },
    
    get_user_token: function() {
        return jwt.sign( { user_id: USER_ID}, security.jwt.secretOrKey);
    },
    
    get_hacker_token: function() {
        return jwt.sign( { user_id: HACKER_ID}, security.jwt.secretOrKey);
    }
}