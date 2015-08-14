var mongoose        = require('mongoose'),
    Account         = mongoose.model('Account'),
    EventEmitter    = require('events').EventEmitter,
    AccountController   = require('../controllers/accounts');


var eventEmitter = new EventEmitter(),
    ACCOUNTS_DELETE_BY_USER_ID_EVT = 'accounts.delete.by.user.id',
    ENTRIES_DELETE_BY_ACCOUNT_EVT = 'entries.delete.by.account';

eventEmitter.on(ACCOUNTS_DELETE_BY_USER_ID_EVT, function(user_id) {
    Account.find({user_id: user_id}, function(errors, accounts) {
        if( errors ) {
            console.error('An error occurs during accounts deletion for user ' + user_id, errors);
            return;
        }
        
        if( !accounts ) {
            console.log('No accounts');
            return;
        }
       for( var index in accounts ) {
           eventEmitter.emit(ENTRIES_DELETE_BY_ACCOUNT_EVT, accounts[index]);
       } 
    });
});
eventEmitter.on(ENTRIES_DELETE_BY_ACCOUNT_EVT, AccountController.delete_account);

module.exports = {
    events : {
        ACCOUNTS_DELETE_BY_USER_ID_EVT: ACCOUNTS_DELETE_BY_USER_ID_EVT,
        ENTRIES_DELETE_BY_ACCOUNT_EVT: ENTRIES_DELETE_BY_ACCOUNT_EVT
    },
    eventEmitter: eventEmitter
}