var passport            = require('../security/passport'),
    AccountController   = require('../controllers/accounts');
    
module.exports = function(app) {
    
    app.post('/api/accounts', passport.jwt, AccountController.create);
    
    app.delete('/api/accounts/:account_id', passport.jwt, AccountController.delete);
    
    app.get('/api/accounts/:account_id', passport.jwt, AccountController.get);
    
    app.put('/api/accounts/:account_id', passport.jwt, AccountController.modify);
    
    app.post('/api/accounts/:account_id/entries', passport.jwt, AccountController.add_entry);
    
    app.put('/api/accounts/:account_id/entries/:entry_id', passport.jwt, AccountController.modify_entry);
    
    app.delete('/api/accounts/:account_id/entries/:entry_id', passport.jwt, AccountController.delete_entry);
    
    app.get('/api/accounts/:account_id/entries', passport.jwt, AccountController.list_entries);
    
};